export function nextRangeFilterValue(
  current: string | Array<string>,
  input: string,
  isMin: boolean,
  min: number,
  max: number
): Array<string> | undefined {
  const numValue = Number(input);
  const currentValues = Array.isArray(current) ? current : ['', ''];
  const otherValue = isMin
    ? (currentValues[1] ?? '')
    : (currentValues[0] ?? '');

  if (
    input === '' ||
    (!Number.isNaN(numValue) &&
      (isMin
        ? numValue >= min && numValue <= (Number(otherValue) || max)
        : numValue <= max && numValue >= (Number(otherValue) || min)))
  ) {
    return isMin ? [input, otherValue] : [otherValue, input];
  }

  return undefined;
}
