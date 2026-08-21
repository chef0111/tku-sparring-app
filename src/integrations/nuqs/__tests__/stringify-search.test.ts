import { defaultParseSearch } from '@tanstack/react-router';
import { describe, expect, it } from 'vitest';
import { stringifySearch } from '@/integrations/nuqs/stringify-search';

const sort = [{ id: 'beltLevel', desc: true }];

describe('stringifySearch', () => {
  it('leaves curly braces literal in JSON sort values', () => {
    const query = stringifySearch({ sort });

    expect(query).toContain('{');
    expect(query).toContain('}');
    expect(query).not.toMatch(/%7B/i);
    expect(query).not.toMatch(/%7D/i);
  });

  it('roundtrips sort through the default search parser', () => {
    const query = stringifySearch({ sort, page: 1 });

    expect(defaultParseSearch(query)).toEqual({
      sort,
      page: 1,
    });
  });
});
