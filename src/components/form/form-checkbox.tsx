import { useFieldContext } from "./hooks";
import { FormBase } from "./form-base";
import type { FormControlProps } from "./form-base";
import { Checkbox } from "@/components/ui/checkbox";

export function FormCheckbox({ descPosition, ...props }: FormControlProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase
      {...props}
      controlFirst
      orientation="horizontal"
      descPosition={descPosition}
    >
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(e) => field.handleChange(e === true)}
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
}
