import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { publishSelectionInvalidate } from '@/server/infrastructure/realtime/publish';

describe('tournament realtime broadcast', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    fetchMock.mockResolvedValue({ ok: true });
    fetchMock.mockClear();
    process.env.REALTIME_INTERNAL_BROADCAST_URL =
      'http://localhost:3331/internal/broadcast';
    process.env.REALTIME_INTERNAL_BROADCAST_SECRET = 'test-secret';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.REALTIME_INTERNAL_BROADCAST_URL;
    delete process.env.REALTIME_INTERNAL_BROADCAST_SECRET;
    vi.restoreAllMocks();
  });

  it('POSTs invalidate payload to internal broadcast URL', async () => {
    publishSelectionInvalidate('t-1');
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3331/internal/broadcast',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-secret',
          'Content-Type': 'application/json',
        }),
      })
    );
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(String(init.body))).toEqual({
      tournamentId: 't-1',
      event: { type: 'invalidate', tournamentId: 't-1' },
    });
  });

  it('does not POST when only INTERNAL_BROADCAST_SECRET is set', async () => {
    delete process.env.REALTIME_INTERNAL_BROADCAST_SECRET;
    process.env.INTERNAL_BROADCAST_SECRET = 'test-secret';
    publishSelectionInvalidate('t-1');
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('logs fetch cause code and hostname when POST throws', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const err = new Error('fetch failed');
    err.cause = Object.assign(
      new Error('getaddrinfo ENOTFOUND ws.tss.localhost'),
      {
        code: 'ENOTFOUND',
        hostname: 'ws.tss.localhost',
      }
    );
    fetchMock.mockRejectedValue(err);

    publishSelectionInvalidate('t-1');
    await vi.waitFor(() => expect(warn).toHaveBeenCalled());

    const logged = warn.mock.calls.map((call) => String(call[0])).join('\n');
    expect(logged).toContain(
      'broadcast failed: fetch failed (ENOTFOUND ws.tss.localhost)'
    );
  });
});
