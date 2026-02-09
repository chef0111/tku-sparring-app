import type { CreateMatchDTO, UpdateMatchDTO } from './matches.dto';
import { prisma } from '@/lib/db';

export class MatchDAL {
  static async findByGroupId(groupId: string) {
    return await prisma.match.findMany({
      where: { groupId },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async findByTournamentId(tournamentId: string) {
    return await prisma.match.findMany({
      where: { tournamentId },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async create(data: CreateMatchDTO) {
    return await prisma.match.create({ data });
  }

  static async update(id: string, data: Omit<UpdateMatchDTO, 'id'>) {
    return await prisma.match.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return await prisma.match.delete({ where: { id } });
  }
}

export const findByGroupId = (
  ...args: Parameters<typeof MatchDAL.findByGroupId>
) => MatchDAL.findByGroupId(...args);

export const findByTournamentId = (
  ...args: Parameters<typeof MatchDAL.findByTournamentId>
) => MatchDAL.findByTournamentId(...args);

export const create = (...args: Parameters<typeof MatchDAL.create>) =>
  MatchDAL.create(...args);

export const update = (...args: Parameters<typeof MatchDAL.update>) =>
  MatchDAL.update(...args);

export const deleteMatch = (...args: Parameters<typeof MatchDAL.delete>) =>
  MatchDAL.delete(...args);
