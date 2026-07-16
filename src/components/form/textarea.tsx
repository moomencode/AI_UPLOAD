import { forwardRef, type TextareaHTMLAttributes } from "react";

import type { InputState } from "./types";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: InputState;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { state = "default", className = "", disabled, id, ...props },
  ref,
) {
  const stateClass = state === "error" ? "input-error" : state === "success" ? "input-success" : "";

  return (
    <textarea
      ref={ref}
      id={id}
      className={`textarea ${stateClass} ${className}`}
      disabled={disabled}
      aria-invalid={state === "error" ? true : undefined}
      {...props}
    />
  );
});
