"use client";

import { useEffect, useRef } from "react";
import { useCalculator } from "../hooks/useCalculator";

/**
 * Keypad layout — matches the original calculator:
 *   C   ⌫   %   ÷
 *   7   8   9   ×
 *   4   5   6   -
 *   1   2   3   +
 *   ±   0   .   =
 * (The ± key replaces the double-wide zero so sign conversion is available,
 * mirroring the standard bottom row of desktop calculators.)
 */
const KEYS = [
  { id: "clear", label: "C", variant: "special", aria: "All clear" },
  { id: "delete", label: "⌫", variant: "backspace", aria: "Delete last character" },
  { id: "%", label: "%", variant: "operator", aria: "Percent" },
  { id: "÷", label: "÷", variant: "operator", aria: "Divide" },
  { id: "7", label: "7", aria: "Seven" },
  { id: "8", label: "8", aria: "Eight" },
  { id: "9", label: "9", aria: "Nine" },
  { id: "×", label: "×", variant: "operator", aria: "Multiply" },
  { id: "4", label: "4", aria: "Four" },
  { id: "5", label: "5", aria: "Five" },
  { id: "6", label: "6", aria: "Six" },
  { id: "-", label: "-", variant: "operator", aria: "Subtract" },
  { id: "1", label: "1", aria: "One" },
  { id: "2", label: "2", aria: "Two" },
  { id: "3", label: "3", aria: "Three" },
  { id: "+", label: "+", variant: "operator", aria: "Add" },
  { id: "sign", label: "±", aria: "Toggle sign" },
  { id: "0", label: "0", aria: "Zero" },
  { id: ".", label: ".", aria: "Decimal point" },
  { id: "=", label: "=", variant: "equals", aria: "Equals" },
];

function actionForKey(key, actions) {
  switch (key.id) {
    case "clear":
      return actions.pressClear;
    case "delete":
      return actions.pressDelete;
    case "%":
      return actions.pressPercent;
    case "sign":
      return actions.pressSign;
    case ".":
      return actions.pressDecimal;
    case "=":
      return actions.pressEquals;
    default:
      if (/^[0-9]$/.test(key.id)) return () => actions.pressDigit(key.id);
      return () => actions.pressOperator(key.id); // operator id is its symbol
  }
}

export default function Calculator() {
  const { expression, pressedKey, actions } = useCalculator();
  const displayRef = useRef(null);

  // Keep the most recent input visible in the horizontally scrolling display.
  useEffect(() => {
    const display = displayRef.current;
    if (display) display.scrollLeft = display.scrollWidth;
  }, [expression]);

  return (
    <main className="grid min-h-dvh place-items-center p-4">
      <section className="calculator" aria-label="Calculator">
        <div className="display">
          <div
            className="display-text"
            ref={displayRef}
            role="status"
            aria-live="polite"
            aria-label="Display"
          >
            {expression}
          </div>
        </div>
        <div className="buttons" role="group" aria-label="Calculator keypad">
          {KEYS.map((key) => (
            <button
              key={key.id}
              type="button"
              className={
                "btn" +
                (key.variant ? ` ${key.variant}` : "") +
                (pressedKey === key.id ? " flash" : "")
              }
              aria-label={key.aria}
              onMouseDown={(event) => event.preventDefault()}
              onClick={actionForKey(key, actions)}
            >
              {key.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
