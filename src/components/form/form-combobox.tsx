import { FormBase } from './form-base';
import { useFieldContext } from './hooks';
import type { FormControlProps } from './form-base';
import type { ComboboxData } from '@/components/ui/combobox';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox';

type FormComboboxProps = FormControlProps & {
  children: React.ReactNode;
  data: Array<ComboboxData>;
  type: string;
};

export function FormCombobox({
  data,
  type,
  children,
  descPosition,
  ...props
}: FormComboboxProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props} descPosition={descPosition}>
      <Combobox
        data={data}
        onValueChange={(e) => field.handleChange(e ?? '')}
        value={field.state.value}
        type={type}
      >
        <ComboboxTrigger
          aria-invalid={isInvalid}
          id={field.name}
          onBlur={field.handleBlur}
          className="w-full"
        />
        <ComboboxContent className="w-full">
          <ComboboxInput />
          <ComboboxEmpty />
          <ComboboxList>
            <ComboboxGroup>{children}</ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </FormBase>
  );
}
