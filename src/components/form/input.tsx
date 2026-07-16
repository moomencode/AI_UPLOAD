import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import type { InputState, InputSize } from "./types";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  state?: InputState;
  inputSize?: InputSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    state = "default",
    inputSize = "md",
    leadingIcon,
    trailingIcon,
    className = "",
    wrapperClassName = "",
    disabled,
    id,
    ...props
  },
  ref,
) {
  const stateClass = state === "error" ? "input-error" : state === "success" ? "input-success" : "";
  const sizeClass = inputSize === "sm" ? "input-sm" : inputSize === "lg" ? "input-lg" : "";

  return (
    <div className={`input-wrapper ${wrapperClassName}`}>
      {leadingIcon !== undefined ? (
        <span className="input-icon input-icon-leading" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <input
        ref={ref}
        id={id}
        className={`input ${stateClass} ${sizeClass} ${leadingIcon !== undefined ? "input-has-leading" : ""} ${trailingIcon !== undefined ? "input-has-trailing" : ""} ${className}`}
        disabled={disabled}
        aria-invalid={state === "error" ? true : undefined}
        {...props}
      />
      {trailingIcon !== undefined ? (
        <span className="input-icon input-icon-trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </div>
  );
});
