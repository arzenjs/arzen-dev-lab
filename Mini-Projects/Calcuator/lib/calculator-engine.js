/**
 * Pure calculator logic — no React, no DOM.
 *
 * The calculator keeps a single expression string (e.g. "12+3×4", "5×-3",
 * "200×10%") and evaluates it with correct operator precedence when "=" is
 * pressed. Every function is pure so the behavior is easy to test.
 */

export const OPERATORS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

const OPERATOR_CHARS = Object.keys(OPERATORS);

/** Maximum digits allowed per numeric entry (avoids float precision noise). */
const MAX_DIGITS = 15;

const isOperatorChar = (char) => OPERATOR_CHARS.includes(char);

const endsWithOperator = (expression) =>
  expression.length > 0 && isOperatorChar(expression[expression.length - 1]);

/** Rounds away binary floating-point noise: 0.1 + 0.2 → "0.3". */
export function formatResult(value) {
  const rounded = Number(value.toPrecision(12));
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

/**
 * Evaluates a complete, valid expression string.
 * Handles unary signs ("-5+3", "5×-3"), percent suffixes ("50%", "200×10%")
 * and operator precedence (× and ÷ before + and -; left-to-right within a
 * precedence level). Returns NaN for malformed expressions and Infinity for
 * division by zero — callers turn those into "Error".
 */
export function evaluate(expression) {
  const raw = expression.match(/\d+(?:\.\d+)?%?|[+\-×÷]/g);
  if (!raw) return NaN;

  // Normalize: fold unary +/- signs into the number that follows them.
  const tokens = [];
  for (let i = 0; i < raw.length; i++) {
    const token = raw[i];
    if (isOperatorChar(token)) {
      const previous = tokens[tokens.length - 1];
      const isSign =
        (token === "-" || token === "+") &&
        (previous === undefined || isOperatorChar(previous));
      if (isSign) {
        const next = raw[i + 1];
        if (next === undefined || isOperatorChar(next)) return NaN;
        tokens.push((token === "-" ? "-" : "") + next);
        i++;
      } else {
        tokens.push(token);
      }
    } else {
      const previous = tokens[tokens.length - 1];
      if (previous !== undefined && !isOperatorChar(previous)) return NaN;
      tokens.push(token);
    }
  }

  if (tokens.length === 0 || isOperatorChar(tokens[tokens.length - 1])) {
    return NaN;
  }

  // Convert operands; a trailing "%" means "divide by one hundred".
  const sequence = tokens.map((token) => {
    if (isOperatorChar(token)) return token;
    const value = token.endsWith("%")
      ? Number.parseFloat(token.slice(0, -1)) / 100
      : Number.parseFloat(token);
    return Number.isNaN(value) ? NaN : value;
  });
  if (sequence.some((item) => typeof item === "number" && Number.isNaN(item))) {
    return NaN;
  }

  // Pass 1: multiplication and division (left to right).
  const additive = [];
  for (let i = 0; i < sequence.length; i++) {
    const item = sequence[i];
    if (item === "×" || item === "÷") {
      const left = additive.pop();
      const right = sequence[++i];
      if (typeof left !== "number" || typeof right !== "number") return NaN;
      additive.push(OPERATORS[item](left, right));
    } else {
      additive.push(item);
    }
  }

  // Pass 2: addition and subtraction (left to right).
  let result = additive[0];
  for (let i = 1; i < additive.length; i += 2) {
    result = OPERATORS[additive[i]](result, additive[i + 1]);
  }
  return result;
}

/** Appends a digit, handling fresh starts and leading zeros. */
export function inputDigit(expression, digit, justEvaluated) {
  if (expression === "Error" || justEvaluated) return digit;
  if (expression === "0") return digit;
  if (expression === "-0") return "-" + digit;
  if (endsWithOperator(expression)) return expression + digit;
  if (expression.endsWith("%")) return expression;

  const trailingDigits = expression.match(/(\d+)$/);
  if (trailingDigits) {
    if (trailingDigits[1].length >= MAX_DIGITS) return expression;
    // Replace a lone leading zero instead of growing it ("5+0" → "5+3").
    if (trailingDigits[1] === "0") return expression.slice(0, -1) + digit;
  }
  return expression + digit;
}

/** Appends a decimal point (at most one per numeric entry). */
export function inputDecimal(expression, justEvaluated) {
  if (expression === "Error" || justEvaluated) return "0.";
  if (expression.endsWith(".") || expression.endsWith("%")) return expression;
  if (endsWithOperator(expression)) return expression + "0.";
  const entry = expression.match(/(\d+(?:\.\d+)?)$/);
  if (entry && entry[1].includes(".")) return expression;
  return expression + ".";
}

/**
 * Appends an operator. Replaces a pending operator, turns a trailing "5."
 * into "5.0", and allows a leading negative operand after × or ÷ ("5×-3").
 */
export function inputOperator(expression, operator) {
  if (expression === "Error") return expression;
  const normalized = expression.endsWith(".")
    ? expression + "0"
    : expression;
  if (normalized === "-") return "0" + operator;

  // A "-" sign is pending after another operator, e.g. "5×-".
  if (/[+×÷]-$/.test(normalized)) {
    if (operator === "-") return normalized;
    return normalized.slice(0, -2) + operator;
  }

  if (endsWithOperator(normalized)) {
    const last = normalized[normalized.length - 1];
    if (operator === "-" && (last === "×" || last === "÷")) {
      return normalized + "-";
    }
    return normalized.slice(0, -1) + operator;
  }
  return normalized + operator;
}

/** Appends "%" after the current numeric entry (percent = entry / 100). */
export function inputPercent(expression) {
  if (expression === "Error" || expression.endsWith("%")) return expression;
  return /\d$/.test(expression) ? expression + "%" : expression;
}

/**
 * Toggles the sign of the current numeric entry. Prefers clean, equivalent
 * forms: "5+3" ↔ "5-3", "5×3" ↔ "5×-3", "12" ↔ "-12".
 */
export function toggleSign(expression) {
  if (expression === "Error") return "0";
  if (expression === "0" || expression === "-0") return "-";
  if (expression === "-") return "0";

  const match = expression.match(/(-?)(\d+(?:\.\d+)?)(%?)(\.)?$/);
  if (!match) {
    // Ends with an operator: begin a negative entry.
    if (endsWithOperator(expression)) return expression + "-";
    return expression;
  }

  const [full, sign, digits, percent, dot] = match;
  const suffix = (percent ?? "") + (dot ?? "");
  const start = expression.length - full.length;
  const before = expression.slice(0, start);
  const previous = before[before.length - 1];

  if (sign === "-") {
    if (start === 0) return digits + suffix;
    if (isOperatorChar(previous)) return before + digits + suffix;
    // Binary minus ("5-3"): negate the entry → "5--3" (= 5 − (−3)).
    return before + "-" + full;
  }
  if (start === 0) return "-" + full;
  if (previous === "+") return before.slice(0, -1) + "-" + digits + suffix;
  return before + "-" + digits + suffix;
}

/** Removes the last character, never leaving an empty or dangling sign. */
export function deleteLast(expression) {
  if (expression === "Error" || expression.length <= 1) return "0";
  const next = expression.slice(0, -1);
  return next === "" || next === "-" ? "0" : next;
}

/**
 * Evaluates the expression for "=". Trailing operators/signs are discarded
 * ("12+" → "12"). Returns the new expression plus whether a result was
 * produced (so the next digit starts fresh while operators keep chaining).
 */
export function computeEquals(expression) {
  if (expression === "Error") return { expression, evaluated: false };

  let target = expression;
  while (target.length > 0) {
    if (target.endsWith(".")) {
      target = target.slice(0, -1);
      continue;
    }
    if (endsWithOperator(target)) {
      const last = target[target.length - 1];
      const beforeLast = target[target.length - 2];
      // Pending sign after an operator, e.g. "5×-" → drop both.
      if (last === "-" && beforeLast !== undefined && isOperatorChar(beforeLast)) {
        target = target.slice(0, -2);
      } else {
        target = target.slice(0, -1);
      }
      continue;
    }
    break;
  }

  if (target === "" || target === "-") {
    return { expression, evaluated: false };
  }

  const value = evaluate(target);
  if (!Number.isFinite(value)) {
    return { expression: "Error", evaluated: true };
  }
  return { expression: formatResult(value), evaluated: true };
}
