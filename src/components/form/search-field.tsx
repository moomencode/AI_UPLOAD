import { forwardRef, useState, useCallback } from "react";

import type { InputProps } from "./input";
import { Input } from "./input";

import { Icon } from "@/components/icon";

export interface SearchFieldProps extends Omit<
  InputProps,
  "leadingIcon" | "trailingIcon" | "type"
> {
  onClear?: () => void;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { value: controlledValue, onChange, onClear, className = "", ...props },
  ref,
) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      if (onChange !== undefined) {
        onChange(e);
      }
    },
    [isControlled, onChange],
  );

  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue("");
    }
    if (onClear !== undefined) {
      onClear();
    }
  }, [isControlled, onClear]);

  return (
    <Input
      ref={ref}
      type="search"
      value={currentValue}
      onChange={handleChange}
      leadingIcon={<Icon name="search" size={18} />}
      trailingIcon={
        currentValue !== "" ? (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            tabIndex={-1}
          >
            <Icon name="close" size={16} />
          </button>
        ) : undefined
      }
      className={className}
      {...props}
    />
  );
});
