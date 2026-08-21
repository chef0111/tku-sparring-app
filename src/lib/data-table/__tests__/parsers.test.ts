import { describe, expect, it } from 'vitest';
import type { AthleteProfileData } from '@/contracts/athlete/profile';
import { ATHLETE_PROFILE_SORT_IDS } from '@/contracts/athlete/profile';
import {
  getFiltersStateParser,
  getSortingStateParser,
} from '@/lib/data-table/parsers';

describe('getSortingStateParser', () => {
  it('parses athleteCode with the athlete list sort ids', () => {
    const sorting = [
      { id: 'beltLevel' as const, desc: true },
      { id: 'name' as const, desc: false },
      { id: 'athleteCode' as const, desc: false },
    ];
    const parser = getSortingStateParser<AthleteProfileData>(
      new Set(ATHLETE_PROFILE_SORT_IDS)
    );
    const serialized = parser.serialize(sorting);

    expect(parser.parse(serialized)).toEqual(sorting);
  });

  it('rejects a sort id missing from validKeys', () => {
    const parser = getSortingStateParser(new Set(['name', 'beltLevel']));
    expect(
      parser.parse(
        JSON.stringify([
          { id: 'beltLevel', desc: true },
          { id: 'athleteCode', desc: false },
        ])
      )
    ).toBeNull();
  });
});

describe('getFiltersStateParser', () => {
  it('treats range values with the same contents as equal', () => {
    const parser = getFiltersStateParser<AthleteProfileData>();
    const left = [
      {
        id: 'weight' as const,
        value: ['50', '70'],
        variant: 'range' as const,
        operator: 'isBetween' as const,
        filterId: 'w1',
      },
    ];
    const right = [
      {
        id: 'weight' as const,
        value: ['50', '70'],
        variant: 'range' as const,
        operator: 'isBetween' as const,
        filterId: 'w1',
      },
    ];

    expect(parser.eq(left, right)).toBe(true);
  });
});
