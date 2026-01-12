import * as React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { FormBase } from "./form-base";
import { useFieldContext } from "./hooks";
import type { FormControlProps } from "./form-base";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
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
      <InputGroup>
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          className="[&::-ms-reveal]:hidden"
          type={showPassword ? "text" : "password"}
          {...inputProps}
        />
        <InputGroupAddon align="inline-end">
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:bg-transparent!"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IconEyeOff className="size-5 shrink-0 opacity-50" />
            ) : (
              <IconEye className="size-5 shrink-0 opacity-50" />
            )}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </FormBase>
  );
}
