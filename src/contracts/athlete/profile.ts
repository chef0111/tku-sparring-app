export const ATHLETE_PROFILE_SORT_IDS = [
  'name',
  'athleteCode',
  'beltLevel',
  'weight',
  'affiliation',
  'createdAt',
] as const;

export type AthleteProfileSortId = (typeof ATHLETE_PROFILE_SORT_IDS)[number];

export interface AthleteProfileData {
  id: string;
  athleteCode: string;
  name: string;
  gender: string;
  beltLevel: number;
  weight: number;
  affiliation: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type AthleteRow = {
  id: string;
  athleteCode: string;
  name: string;
  gender: 'M' | 'F';
  beltLevel: number;
  weight: number;
  affiliation: string;
  image: string;
};
