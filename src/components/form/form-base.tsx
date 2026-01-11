import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { useFieldContext } from "./hooks";
import type { ReactNode } from "react";

export type FormControlProps = {
  label: string;
  description?: string;
  fieldClassName?: string;
};

type FormBaseProps = FormControlProps & {
  children: ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal" | "responsive" | null;
  controlFirst?: boolean;
};

export function FormBase({
  children,
  label,
  description,
  className,
  controlFirst,
  orientation,
}: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );
  const errorElem = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={orientation}
      className={className}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>{labelElement}</FieldContent>
          {children}
          {errorElem}
        </>
      )}
    </Field>
  );
}
