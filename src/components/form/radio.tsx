import {
  forwardRef,
  type InputHTMLAttributes,
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { Label } from "./label";
import type { InputState } from "./types";

export interface RadioGroupProps {
  children: ReactNode;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  state?: InputState;
  disabled?: boolean;
  className?: string;
}

interface RadioContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  state?: InputState;
  disabled?: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

function useRadioContext() {
  const ctx = useContext(RadioContext);

  if (ctx === null) {
    throw new Error("Radio must be used within a RadioGroup");
  }

  return ctx;
}

export function RadioGroup({
  children,
  name,
  value,
  onChange,
  state,
  disabled,
  className = "",
}: RadioGroupProps) {
  return (
    <RadioContext.Provider value={{ name, value, onChange, state, disabled }}>
      <div className={`radio-group ${className}`} role="radiogroup">
        {children}
      </div>
    </RadioContext.Provider>
  );
}

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "checked" | "onChange"
> {
  value: string;
  label?: ReactNode;
  labelClassName?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, label, labelClassName = "", className = "", disabled: localDisabled, ...props },
  ref,
) {
  const ctx = useRadioContext();
  const isDisabled = ctx.disabled === true || localDisabled === true;

  return (
    <div className={`radio-wrapper ${isDisabled ? "radio-disabled" : ""}`}>
      <input
        ref={ref}
        type="radio"
        id={`${ctx.name}-${value}`}
        name={ctx.name}
        value={value}
        checked={ctx.value === value}
        onChange={(e) => {
          if (ctx.onChange !== undefined) {
            ctx.onChange(e.target.value);
          }
        }}
        className={`radio-input ${className}`}
        disabled={isDisabled}
        aria-invalid={ctx.state === "error" ? true : undefined}
        {...props}
      />
      {label !== undefined ? (
        <Label
          htmlFor={`${ctx.name}-${value}`}
          className={`radio-label ${labelClassName}`}
          disabled={isDisabled}
        >
          {label}
        </Label>
      ) : null}
    </div>
  );
});
