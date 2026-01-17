import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";
import type { FormControlProps } from "./form-base";
import { Textarea } from "@/components/ui/textarea";

export type FormTextareaProps = FormControlProps &
  Omit<
    React.ComponentProps<"textarea">,
    "id" | "name" | "value" | "onChange" | "onBlur"
  >;

export function FormTextarea({
  label,
  description,
  fieldClassName,
  descPosition,
  ...textareaProps
}: FormTextareaProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase
      label={label}
      description={description}
      descPosition={descPosition}
      className={fieldClassName}
    >
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...textareaProps}
      />
    </FormBase>
  );
}
