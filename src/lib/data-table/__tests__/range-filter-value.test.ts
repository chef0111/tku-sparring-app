import { describe, expect, it } from 'vitest';
import { nextRangeFilterValue } from '@/lib/data-table/range-filter-value';

describe('nextRangeFilterValue', () => {
  it('commits the typed min when the current filter value is still a string', () => {
    expect(nextRangeFilterValue('', '50', true, 20, 150)).toEqual(['50', '']);
  });

  it('commits the typed max against an existing min', () => {
    expect(nextRangeFilterValue(['50', ''], '70', false, 20, 150)).toEqual([
      '50',
      '70',
    ]);
  });

  it('composes min then max before the parent re-renders', () => {
    let draft: string | Array<string> = '';
    draft = nextRangeFilterValue(draft, '50', true, 20, 150) ?? draft;
    draft = nextRangeFilterValue(draft, '70', false, 20, 150) ?? draft;
    expect(draft).toEqual(['50', '70']);
  });

  it('rejects a min above the allowed column max', () => {
    expect(nextRangeFilterValue('', '200', true, 20, 150)).toBeUndefined();
  });
});
