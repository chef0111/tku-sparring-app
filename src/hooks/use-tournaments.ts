import { useCallback, useState } from 'react';

/**
 * Placeholder hook for fetching tournaments.
 * Replace with actual API call when backend is ready.
 */
export function useTournaments() {
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder data - replace with API call
  const data: Array<Tournament> = [];

  const refetch = useCallback(() => {
    setIsLoading(true);
    // TODO: Implement API call
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    refetch,
  };
}

/**
 * Placeholder hook for fetching groups by tournament.
 * Disabled when no tournament is selected.
 */
export function useGroups(tournamentId: string | null) {
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder data - replace with API call filtered by tournamentId
  const data: Array<Group> = [];

  const isDisabled = !tournamentId;

  const refetch = useCallback(() => {
    if (!tournamentId) return;
    setIsLoading(true);
    // TODO: Implement API call
    setIsLoading(false);
  }, [tournamentId]);

  return {
    data,
    isLoading,
    isDisabled,
    refetch,
  };
}

/**
 * Placeholder hook for fetching matches by group.
 * Disabled when no group is selected.
 */
export function useMatches(groupId: string | null) {
  const [isLoading, setIsLoading] = useState(false);

  // Placeholder data - replace with API call filtered by groupId
  const data: Array<Match> = [];

  const isDisabled = !groupId;

  const refetch = useCallback(() => {
    if (!groupId) return;
    setIsLoading(true);
    // TODO: Implement API call
    setIsLoading(false);
  }, [groupId]);

  return {
    data,
    isLoading,
    isDisabled,
    refetch,
  };
}

/**
 * Fetch match details including athlete information.
 * Use this to auto-populate athlete data when a match is selected.
 */
export function useMatchDetails(matchId: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [match, setMatch] = useState<Match | null>(null);

  const refetch = useCallback(() => {
    if (!matchId) {
      setMatch(null);
      return;
    }
    setIsLoading(true);
    // TODO: Implement API call
    setIsLoading(false);
  }, [matchId]);

  return {
    match,
    isLoading,
    refetch,
  };
}
