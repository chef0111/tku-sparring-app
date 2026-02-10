import { z } from 'zod';

export const TournamentSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateTournamentSchema = z.object({
  name: z.string().min(1, 'Tournament name is required'),
});

export const UpdateTournamentSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Tournament name is required'),
});

export type TournamentDTO = z.infer<typeof TournamentSchema>;
export type CreateTournamentDTO = z.infer<typeof CreateTournamentSchema>;
export type UpdateTournamentDTO = z.infer<typeof UpdateTournamentSchema>;
