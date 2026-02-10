import { z } from 'zod';
import { CreateGroupSchema, UpdateGroupSchema } from './groups.dto';
import {
  create,
  deleteGroup,
  findById,
  findByTournamentId,
  update,
} from './groups.dal';
import { authedProcedure } from '@/orpc/middleware';

export const listGroups = authedProcedure
  .input(z.object({ tournamentId: z.string() }))
  .handler(async ({ input }) => {
    return findByTournamentId(input.tournamentId);
  });

export const getGroup = authedProcedure
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const group = await findById(input.id);
    if (!group) {
      throw new Error('Group not found');
    }
    return group;
  });

export const createGroup = authedProcedure
  .input(CreateGroupSchema)
  .handler(async ({ input }) => {
    return create(input);
  });

export const updateGroup = authedProcedure
  .input(UpdateGroupSchema)
  .handler(async ({ input }) => {
    const { id, ...data } = input;
    return update(id, data);
  });

export const removeGroup = authedProcedure
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    return deleteGroup(input.id);
  });
