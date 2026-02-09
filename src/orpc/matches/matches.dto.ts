import { z } from 'zod';

export const MatchSchema = z.object({
  id: z.string(),
  redAthleteId: z.string(),
  blueAthleteId: z.string(),
  redWins: z.number().int(),
  blueWins: z.number().int(),
  winnerId: z.string().nullable(),
  groupId: z.string(),
  tournamentId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateMatchSchema = z.object({
  redAthleteId: z.string(),
  blueAthleteId: z.string(),
  groupId: z.string(),
  tournamentId: z.string(),
});

export const UpdateMatchSchema = z.object({
  id: z.string(),
  redWins: z.number().int().optional(),
  blueWins: z.number().int().optional(),
  winnerId: z.string().nullable().optional(),
});

export type MatchDTO = z.infer<typeof MatchSchema>;
export type CreateMatchDTO = z.infer<typeof CreateMatchSchema>;
export type UpdateMatchDTO = z.infer<typeof UpdateMatchSchema>;
