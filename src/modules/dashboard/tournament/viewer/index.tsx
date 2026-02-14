import { Link } from '@tanstack/react-router';
import { Trophy } from 'lucide-react';
import { TournamentViewer } from './viewer';
import { TournamentViewerLoading } from './loading';
import { Button } from '@/components/ui/button';
import { useTournament } from '@/queries/tournaments';
import { useGroups } from '@/queries/groups';

interface TournamentPageProps {
  id: string;
}

export function TournamentPage({ id }: TournamentPageProps) {
  const tournamentQuery = useTournament(id);
  const groupsQuery = useGroups(id);

  if (tournamentQuery.isPending) {
    return <TournamentViewerLoading />;
  }

  if (tournamentQuery.isError || !tournamentQuery.data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Trophy className="text-muted-foreground size-12" />
        <h2 className="text-lg font-semibold">Tournament not found</h2>
        <Button variant="outline" render={<Link to="/dashboard/tournament" />}>
          Back to tournaments
        </Button>
      </div>
    );
  }

  const tournament = tournamentQuery.data;
  const groups = groupsQuery.data ?? [];

  return (
    <TournamentViewer
      tournament={tournament}
      groups={groups}
      tournamentId={id}
    />
  );
}
