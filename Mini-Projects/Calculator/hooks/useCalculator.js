import { useCallback, useEffect, useRef, useState } from "react";
import {
  computeEquals,
  deleteLast,
  inputDecimal,
  inputDigit,
  inputOperator,
  inputPercent,
  toggleSign,
} from "../lib/calculator-engine";

/** How long a key stays visually "pressed" after a keyboard press (ms). */
const FLASH_DURATION = 140;

/**
 * Calculator state machine.
 *
 * State: the expression shown on the display plus a flag recording whether
 * the last action was "=" (so a digit starts a new expression while an
 * operator chains onto the result). Also owns keyboard support and the
 * pressed-key flash used for visual feedback.
 */
export function useCalculator() {
  const [state, setState] = useState({ expression: "0", justEvaluated: false });
  const [pressedKey, setPressedKey] = useState(null);
  const flashTimer = useRef(null);

  const flash = useCallback((keyId) => {
    setPressedKey(keyId);
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setPressedKey(null), FLASH_DURATION);
  }, []);

  useEffect(
    () => () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    },
    []
  );

  const pressDigit = useCallback((digit) => {
    setState((previous) => ({
      expression: inputDigit(previous.expression, digit, previous.justEvaluated),
      justEvaluated: false,
    }));
  }, []);

  const pressDecimal = useCallback(() => {
    setState((previous) => ({
      expression: inputDecimal(previous.expression, previous.justEvaluated),
      justEvaluated: false,
    }));
  }, []);

  const pressOperator = useCallback((operator) => {
    setState((previous) => ({
      expression: inputOperator(previous.expression, operator),
      justEvaluated: false,
    }));
  }, []);

  const pressPercent = useCallback(() => {
    setState((previous) => ({
      expression: inputPercent(previous.expression),
      justEvaluated: false,
    }));
  }, []);

  const pressSign = useCallback(() => {
    setState((previous) => ({
      expression: toggleSign(previous.expression),
      justEvaluated: false,
    }));
  }, []);

  const pressDelete = useCallback(() => {
    setState((previous) => ({
      expression: deleteLast(previous.expression),
      justEvaluated: false,
    }));
  }, []);

  const pressClear = useCallback(() => {
    setState({ expression: "0", justEvaluated: false });
  }, []);

  const pressEquals = useCallback(() => {
    setState((previous) => {
      const { expression, evaluated } = computeEquals(previous.expression);
      return { expression, justEvaluated: evaluated };
    });
  }, []);

  // Full keyboard support: 0–9, + - * /, . %, Enter/=, Backspace, Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, target } = event;

      // If a keypad button has focus, let Enter/Space activate it natively.
      if (
        target instanceof HTMLElement &&
        target.tagName === "BUTTON" &&
        (key === "Enter" || key === " ")
      ) {
        return;
      }

      let action = null;
      let keyId = null;

      if (/^[0-9]$/.test(key)) {
        action = () => pressDigit(key);
        keyId = key;
      } else {
        switch (key) {
          case "+":
            action = () => pressOperator("+");
            keyId = "+";
            break;
          case "-":
            action = () => pressOperator("-");
            keyId = "-";
            break;
          case "*":
            action = () => pressOperator("×");
            keyId = "×";
            break;
          case "/":
            action = () => pressOperator("÷");
            keyId = "÷";
            break;
          case ".":
            action = pressDecimal;
            keyId = ".";
            break;
          case "%":
            action = pressPercent;
            keyId = "%";
            break;
          case "Enter":
          case "=":
            action = pressEquals;
            keyId = "=";
            break;
          case "Backspace":
            action = pressDelete;
            keyId = "delete";
            break;
          case "Escape":
            action = pressClear;
            keyId = "clear";
            break;
          default:
            break;
        }
      }

      if (action) {
        event.preventDefault();
        action();
        flash(keyId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    flash,
    pressClear,
    pressDecimal,
    pressDelete,
    pressDigit,
    pressEquals,
    pressOperator,
    pressPercent,
  ]);

  return {
    expression: state.expression,
    pressedKey,
    actions: {
      pressClear,
      pressDecimal,
      pressDelete,
      pressDigit,
      pressEquals,
      pressOperator,
      pressPercent,
      pressSign,
    },
  };
}
