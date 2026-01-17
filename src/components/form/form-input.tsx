import * as React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";
import type { FormControlProps } from "./form-base";
import { Button } from "@/components/ui/button";
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
  descPosition,
  ...inputProps
}: FormInputProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase
      label={label}
      description={description}
      descPosition={descPosition}
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

export function FormPasswordInput({
  label,
  description,
  fieldClassName,
  descPosition,
  ...inputProps
}: FormInputProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormBase
      label={label}
      description={description}
      descPosition={descPosition}
      className={fieldClassName}
    >
      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          className="pr-10 [&::-ms-reveal]:hidden"
          type={showPassword ? "text" : "password"}
          {...inputProps}
        />
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-1/2 right-1.5 -translate-y-1/2 hover:bg-transparent!"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IconEyeOff className="size-5 shrink-0 opacity-50" />
          ) : (
            <IconEye className="size-5 shrink-0 opacity-50" />
          )}
        </Button>
      </div>
    </FormBase>
  );
}
