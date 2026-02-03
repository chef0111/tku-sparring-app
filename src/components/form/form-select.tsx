import { useFieldContext } from './hooks';
import { FormBase } from './form-base';
import type { FormControlProps } from './form-base';
import type { ReactNode } from 'react';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function FormSelect({
  children,
  descPosition,
  ...props
}: FormControlProps & { children: ReactNode }) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props} descPosition={descPosition}>
      <Select
        onValueChange={(e) => field.handleChange(e ?? '')}
        value={field.state.value}
      >
        <SelectTrigger
          aria-invalid={isInvalid}
          id={field.name}
          onBlur={field.handleBlur}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormBase>
  );
}
