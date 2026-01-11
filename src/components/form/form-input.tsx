import * as React from "react";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";
import type { FormControlProps } from "./form-base";
import { Input } from "@/components/ui/input";

export type FormInputProps = FormControlProps &
  Omit<
    React.ComponentProps<"input">,
    "id" | "name" | "value" | "onChange" | "onBlur"
  >;

export function FormInput({
  label,
  description,
  fieldClassName,
  ...inputProps
}: FormInputProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase
      label={label}
      description={description}
      className={fieldClassName}
    >
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...inputProps}
      />
    </FormBase>
  );
}
