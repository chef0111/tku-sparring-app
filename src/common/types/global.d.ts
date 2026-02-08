declare interface Tournament {
  id: string;
  name: string;
}

declare interface Group {
  id: string;
  name: string;
  tournamentId: string;
}

declare interface Match {
  id: string;
  name: string;
  groupId: string;
  redAthlete: Athlete;
  blueAthlete: Athlete;
}

declare interface Athlete {
  id: string;
  name: string;
  avatar: string | null;
}
