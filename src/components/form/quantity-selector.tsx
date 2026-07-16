import { forwardRef, useState, useCallback } from "react";

import { Icon } from "@/components/icon";

export interface QuantitySelectorProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

export const QuantitySelector = forwardRef<HTMLInputElement, QuantitySelectorProps>(
  function QuantitySelector(
    {
      value: controlledValue,
      defaultValue = 1,
      min = 0,
      max = 99,
      step = 1,
      onChange,
      disabled = false,
      className = "",
      name,
      id,
    },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const clamp = useCallback((v: number) => Math.max(min, Math.min(max, v)), [min, max]);

    const update = useCallback(
      (next: number) => {
        const clamped = clamp(next);
        if (!isControlled) {
          setInternalValue(clamped);
        }
        if (onChange !== undefined) {
          onChange(clamped);
        }
      },
      [clamp, isControlled, onChange],
    );

    const decrement = useCallback(() => update(currentValue - step), [currentValue, step, update]);
    const increment = useCallback(() => update(currentValue + step), [currentValue, step, update]);
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseInt(e.target.value, 10);
        if (!isNaN(parsed)) {
          update(parsed);
        }
      },
      [update],
    );

    const atMin = currentValue <= min;
    const atMax = currentValue >= max;

    return (
      <div className={`quantity-selector ${disabled ? "quantity-disabled" : ""} ${className}`}>
        <button
          type="button"
          className="quantity-btn quantity-btn-minus"
          onClick={decrement}
          disabled={disabled || atMin}
          aria-label="Decrease quantity"
        >
          <Icon name="minus" size={16} />
        </button>
        <input
          ref={ref}
          type="number"
          name={name}
          id={id}
          className="quantity-input"
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          aria-label="Quantity"
        />
        <button
          type="button"
          className="quantity-btn quantity-btn-plus"
          onClick={increment}
          disabled={disabled || atMax}
          aria-label="Increase quantity"
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
    );
  },
);
