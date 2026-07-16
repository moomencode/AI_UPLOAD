import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { Label } from "./label";
import type { InputState } from "./types";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  state?: InputState;
  label?: ReactNode;
  labelClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { state = "default", label, labelClassName = "", className = "", disabled, id, ...props },
  ref,
) {
  const stateClass = state === "error" ? "checkbox-error" : "";
  const isDisabled = disabled === true;

  return (
    <div className={`checkbox-wrapper ${isDisabled ? "checkbox-disabled" : ""}`}>
      <input
        ref={ref}
        type="checkbox"
        id={id}
        className={`checkbox-input ${stateClass} ${className}`}
        disabled={disabled}
        aria-invalid={state === "error" ? true : undefined}
        {...props}
      />
      {label !== undefined ? (
        <Label htmlFor={id} className={`checkbox-label ${labelClassName}`} disabled={disabled}>
          {label}
        </Label>
      ) : null}
    </div>
  );
});
