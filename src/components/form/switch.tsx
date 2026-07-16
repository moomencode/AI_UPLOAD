import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { Label } from "./label";
import type { InputState } from "./types";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  state?: InputState;
  label?: ReactNode;
  labelClassName?: string;
  labelPosition?: "left" | "right";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    state = "default",
    label,
    labelClassName = "",
    labelPosition = "right",
    className = "",
    disabled,
    id,
    ...props
  },
  ref,
) {
  const isDisabled = disabled === true;

  return (
    <div className={`switch-wrapper ${isDisabled ? "switch-disabled" : ""} ${className}`}>
      {label !== undefined && labelPosition === "left" ? (
        <Label htmlFor={id} className={`switch-label ${labelClassName}`} disabled={disabled}>
          {label}
        </Label>
      ) : null}
      <div className="switch-track">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          className="switch-input"
          disabled={disabled}
          aria-invalid={state === "error" ? true : undefined}
          {...props}
        />
        <div className="switch-thumb" aria-hidden="true" />
      </div>
      {label !== undefined && labelPosition === "right" ? (
        <Label htmlFor={id} className={`switch-label ${labelClassName}`} disabled={disabled}>
          {label}
        </Label>
      ) : null}
    </div>
  );
});
