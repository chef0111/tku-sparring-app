export interface TournamentInvalidateEvent {
  type: 'invalidate';
  tournamentId: string;
}

export type TournamentRealtimeEvent = TournamentInvalidateEvent;

let loggedMissingRealtime = false;

function describeFetchError(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  const cause = err instanceof Error ? err.cause : undefined;
  if (!cause || typeof cause !== 'object') {
    return message;
  }
  const rec = cause as { code?: unknown; hostname?: unknown };
  const extra = [rec.code, rec.hostname]
    .filter((value) => typeof value === 'string' && value.length > 0)
    .join(' ');
  return extra ? `${message} (${extra})` : message;
}

function getBroadcastConfig() {
  const url = process.env.REALTIME_INTERNAL_BROADCAST_URL?.trim();
  const secret = process.env.REALTIME_INTERNAL_BROADCAST_SECRET?.trim();
  if (!url || !secret) {
    return null;
  }
  return { url, secret };
}

async function postInternalBroadcast(
  tournamentId: string,
  event: TournamentRealtimeEvent
) {
  const cfg = getBroadcastConfig();
  if (!cfg) {
    if (!loggedMissingRealtime && process.env.NODE_ENV !== 'test') {
      loggedMissingRealtime = true;
      console.warn(
        '[tournament-realtime] REALTIME_INTERNAL_BROADCAST_URL or REALTIME_INTERNAL_BROADCAST_SECRET unset. Cross-instance invalidation disabled.'
      );
    }
    return;
  }
  try {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 5000);
    const res = await fetch(cfg.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.secret}`,
      },
      body: JSON.stringify({ tournamentId, event }),
      signal: ac.signal,
    });
    clearTimeout(t);
    if (!res.ok) {
      console.warn(
        `[tournament-realtime] broadcast failed: HTTP ${res.status}`
      );
    }
  } catch (err) {
    console.warn(
      `[tournament-realtime] broadcast failed: ${describeFetchError(err)}`
    );
  }
}

/** Notifies all browsers in `tournament:{id}` via the external realtime service. */
export function publishSelectionInvalidate(tournamentId: string) {
  const event: TournamentRealtimeEvent = { type: 'invalidate', tournamentId };
  void postInternalBroadcast(tournamentId, event);
}
