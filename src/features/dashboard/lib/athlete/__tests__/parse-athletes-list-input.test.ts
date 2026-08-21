import { describe, expect, it } from 'vitest';
import { parseAthletesListInput } from '../parse-athletes-list-input';

describe('parseAthletesListInput', () => {
  it('keeps athleteCode in sort from search', () => {
    const sorting = [
      { id: 'beltLevel' as const, desc: true },
      { id: 'name' as const, desc: false },
      { id: 'athleteCode' as const, desc: false },
    ];

    expect(parseAthletesListInput({ sort: sorting }).sorting).toEqual(sorting);
  });
});
