import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { useFieldContext } from "./hooks";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FormControlProps = {
  label: string;
  description?: string;
  fieldClassName?: string;
  descPosition?: "block-start" | "block-end";
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
  descPosition = "block-start",
}: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const labelElement = <FieldLabel htmlFor={field.name}>{label}</FieldLabel>;
  const descElement = description && (
    <FieldDescription>{description}</FieldDescription>
  );
  const errorElem = isInvalid && (
    <FieldError
      errors={[field.state.meta.errors[0]]}
      className="w-full text-left"
    />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={orientation}
      className={cn("gap-1.5", className)}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {descPosition === "block-start" && descElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent>
            {labelElement}
            {descPosition === "block-start" && descElement}
          </FieldContent>
          {children}
          {descPosition === "block-end" && descElement}
          {errorElem}
        </>
      )}
    </Field>
  );
}
