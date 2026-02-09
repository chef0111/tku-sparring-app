import { z } from 'zod';

export const AthleteSchema = z.object({
  id: z.string(),
  name: z.string(),
  beltLevel: z.string(),
  weight: z.number(),
  affiliation: z.string(),
  groupId: z.string(),
  tournamentId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateAthleteSchema = z.object({
  name: z.string().min(1, 'Athlete name is required'),
  beltLevel: z.string().min(1, 'Belt level is required'),
  weight: z.number().positive('Weight must be positive'),
  affiliation: z.string().min(1, 'Affiliation is required'),
  groupId: z.string(),
  tournamentId: z.string(),
});

export const UpdateAthleteSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  beltLevel: z.string().min(1).optional(),
  weight: z.number().positive().optional(),
  affiliation: z.string().min(1).optional(),
});

export type AthleteDTO = z.infer<typeof AthleteSchema>;
export type CreateAthleteDTO = z.infer<typeof CreateAthleteSchema>;
export type UpdateAthleteDTO = z.infer<typeof UpdateAthleteSchema>;
