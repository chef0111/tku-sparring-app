import { z } from 'zod';
import { CreateAthleteSchema, UpdateAthleteSchema } from './athletes.dto';
import {
  create,
  deleteAthlete,
  findByGroupId,
  findByTournamentId,
  update,
} from './athletes.dal';
import { authedProcedure } from '@/orpc/middleware';

export const listAthletes = authedProcedure
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

export const createAthlete = authedProcedure
  .input(CreateAthleteSchema)
  .handler(async ({ input }) => {
    return create(input);
  });

export const updateAthlete = authedProcedure
  .input(UpdateAthleteSchema)
  .handler(async ({ input }) => {
    const { id, ...data } = input;
    return update(id, data);
  });

export const removeAthlete = authedProcedure
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    return deleteAthlete(input.id);
  });
