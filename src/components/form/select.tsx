import { forwardRef, type SelectHTMLAttributes } from "react";

import type { InputState } from "./types";

import { Icon } from "@/components/icon";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  state?: InputState;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { state = "default", placeholder, children, className = "", disabled, id, ...props },
  ref,
) {
  const stateClass = state === "error" ? "input-error" : state === "success" ? "input-success" : "";

  return (
    <div className="select-wrapper">
      <select
        ref={ref}
        id={id}
        className={`select ${stateClass} ${className}`}
        disabled={disabled}
        aria-invalid={state === "error" ? true : undefined}
        {...props}
      >
        {placeholder !== undefined ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      <Icon name="chevronDown" size={20} className="select-chevron" />
    </div>
  );
});
