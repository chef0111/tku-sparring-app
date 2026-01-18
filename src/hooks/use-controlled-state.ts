import { useCallback, useEffect, useState } from "react";

export interface UseControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, ...args: Array<unknown>) => void;
}

export function useControlledState<T>(
  props: UseControlledStateProps<T>
): [T | undefined, (next: T, ...args: Array<unknown>) => void] {
  const { value, defaultValue, onChange } = props;

  const [state, setInternalState] = useState<T | undefined>(
    value !== undefined ? value : defaultValue
  );

  useEffect(() => {
    if (value !== undefined) setInternalState(value);
  }, [value]);

  const setState = useCallback(
    (next: T, ...args: Array<unknown>) => {
      setInternalState(next);
      onChange?.(next, ...args);
    },
    [onChange]
  );

  return [state, setState];
}
