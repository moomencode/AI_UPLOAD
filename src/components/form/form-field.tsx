import { useId, isValidElement, cloneElement, type ReactNode } from "react";

import { ErrorMessage } from "./error-message";
import { HelperText } from "./helper-text";
import { Label } from "./label";
import { SuccessMessage } from "./success-message";
import type { InputState } from "./types";

export interface FormFieldProps {
  children: ReactNode;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  state?: InputState;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  id?: string;
}

export function FormField({
  children,
  label,
  helperText,
  error,
  success,
  state,
  required = false,
  disabled = false,
  className = "",
  labelClassName = "",
  id: externalId,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = externalId ?? generatedId;

  const errorId = error !== undefined ? `${fieldId}-error` : undefined;
  const helperId =
    helperText !== undefined && error === undefined ? `${fieldId}-helper` : undefined;
  const successId = success !== undefined && error === undefined ? `${fieldId}-success` : undefined;
  const describedBy = errorId ?? helperId ?? successId;

  return (
    <div className={`form-field ${className}`}>
      {label !== undefined ? (
        <Label htmlFor={fieldId} required={required} disabled={disabled} className={labelClassName}>
          {label}
        </Label>
      ) : null}
      {renderChildren(children, fieldId, state, describedBy, disabled)}
      {error !== undefined && state === "error" ? (
        <ErrorMessage id={errorId}>{error}</ErrorMessage>
      ) : null}
      {helperText !== undefined && state !== "error" && success === undefined ? (
        <HelperText id={helperId}>{helperText}</HelperText>
      ) : null}
      {success !== undefined && state === "success" ? (
        <SuccessMessage id={successId}>{success}</SuccessMessage>
      ) : null}
    </div>
  );
}

function renderChildren(
  children: ReactNode,
  id: string,
  state: InputState | undefined,
  describedBy: string | undefined,
  disabled: boolean,
): ReactNode {
  if (!isValidElement(children)) {
    return children;
  }

  const extraProps: Record<string, unknown> = { id };

  if (state !== undefined) {
    extraProps.state = state;
  }
  if (describedBy !== undefined) {
    extraProps["aria-describedby"] = describedBy;
  }
  if (disabled) {
    extraProps.disabled = true;
  }

  return cloneElement(children, extraProps);
}
