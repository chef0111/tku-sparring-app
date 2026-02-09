import type { CreateAthleteDTO, UpdateAthleteDTO } from './athletes.dto';
import { prisma } from '@/lib/db';

export class AthleteDAL {
  static async findByGroupId(groupId: string) {
    return await prisma.athlete.findMany({
      where: { groupId },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async findByTournamentId(tournamentId: string) {
    return await prisma.athlete.findMany({
      where: { tournamentId },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async create(data: CreateAthleteDTO) {
    return await prisma.athlete.create({ data });
  }

  static async update(id: string, data: Omit<UpdateAthleteDTO, 'id'>) {
    return await prisma.athlete.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.athlete.delete({ where: { id } });
  }
}

export const findByGroupId = (
  ...args: Parameters<typeof AthleteDAL.findByGroupId>
) => AthleteDAL.findByGroupId(...args);

export const findByTournamentId = (
  ...args: Parameters<typeof AthleteDAL.findByTournamentId>
) => AthleteDAL.findByTournamentId(...args);

export const create = (...args: Parameters<typeof AthleteDAL.create>) =>
  AthleteDAL.create(...args);

export const update = (...args: Parameters<typeof AthleteDAL.update>) =>
  AthleteDAL.update(...args);

export const deleteAthlete = (...args: Parameters<typeof AthleteDAL.delete>) =>
  AthleteDAL.delete(...args);
