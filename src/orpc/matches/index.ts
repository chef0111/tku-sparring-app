import { z } from 'zod';
import { CreateMatchSchema, UpdateMatchSchema } from './matches.dto';
import {
  create,
  deleteMatch,
  findByGroupId,
  findByTournamentId,
  update,
} from './matches.dal';
import { authedProcedure } from '@/orpc/middleware';

export const listMatches = authedProcedure
  .input(
    z.object({
      groupId: z.string().optional(),
      tournamentId: z.string().optional(),
    })
  )
  .handler(async ({ input }) => {
    if (input.groupId) {
      return findByGroupId(input.groupId);
    }
    if (input.tournamentId) {
      return findByTournamentId(input.tournamentId);
    }
    throw new Error('Either groupId or tournamentId is required');
  });

export const createMatch = authedProcedure
  .input(CreateMatchSchema)
  .handler(async ({ input }) => {
    return create(input);
  });

export const updateMatch = authedProcedure
  .input(UpdateMatchSchema)
  .handler(async ({ input }) => {
    const { id, ...data } = input;
    return update(id, data);
  });

export const removeMatch = authedProcedure
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    return deleteMatch(input.id);
  });
