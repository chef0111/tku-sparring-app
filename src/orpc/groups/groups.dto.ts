import { z } from 'zod';

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  tournamentId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateGroupSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  tournamentId: z.string(),
});

export const UpdateGroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Group name is required'),
});

export type GroupDTO = z.infer<typeof GroupSchema>;
export type CreateGroupDTO = z.infer<typeof CreateGroupSchema>;
export type UpdateGroupDTO = z.infer<typeof UpdateGroupSchema>;
