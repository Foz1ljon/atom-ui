/**
 * A validation rule. Receives the field value (and optionally all form values)
 * and returns `true` when valid, or an error message string when invalid.
 */
export type ValidationRule<T = any> = (
  value: T,
  allValues?: Record<string, any>,
) => true | string;

const isEmpty = (v: unknown): boolean =>
  v === null ||
  v === undefined ||
  v === "" ||
  (Array.isArray(v) && v.length === 0);

/** Field must not be empty. */
export function required(message = "This field is required"): ValidationRule {
  return (value) => (!isEmpty(value) ? true : message);
}

/** Minimum string length (skips empty values — combine with `required`). */
export function minLength(min: number, message?: string): ValidationRule<string> {
  return (value) => {
    if (isEmpty(value)) return true;
    return String(value).length >= min
      ? true
      : message ?? `Must be at least ${min} characters`;
  };
}

/** Maximum string length. */
export function maxLength(max: number, message?: string): ValidationRule<string> {
  return (value) => {
    if (isEmpty(value)) return true;
    return String(value).length <= max
      ? true
      : message ?? `Must be at most ${max} characters`;
  };
}

/** Minimum numeric value. */
export function min(minVal: number, message?: string): ValidationRule<number> {
  return (value) => {
    if (isEmpty(value)) return true;
    return Number(value) >= minVal ? true : message ?? `Must be at least ${minVal}`;
  };
}

/** Maximum numeric value. */
export function max(maxVal: number, message?: string): ValidationRule<number> {
  return (value) => {
    if (isEmpty(value)) return true;
    return Number(value) <= maxVal ? true : message ?? `Must be at most ${maxVal}`;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Valid email address. */
export function email(message = "Enter a valid email address"): ValidationRule<string> {
  return (value) => {
    if (isEmpty(value)) return true;
    return EMAIL_RE.test(String(value)) ? true : message;
  };
}

const URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

/** Valid http(s) URL. */
export function url(message = "Enter a valid URL"): ValidationRule<string> {
  return (value) => {
    if (isEmpty(value)) return true;
    return URL_RE.test(String(value)) ? true : message;
  };
}

/** Value must match a regular expression. */
export function pattern(re: RegExp, message = "Invalid format"): ValidationRule<string> {
  return (value) => {
    if (isEmpty(value)) return true;
    return re.test(String(value)) ? true : message;
  };
}

/** Numeric value (allows decimals). */
export function numeric(message = "Must be a number"): ValidationRule {
  return (value) => {
    if (isEmpty(value)) return true;
    return !isNaN(Number(value)) ? true : message;
  };
}

/**
 * Value must equal another field's value (e.g. confirm password).
 * @param field key of the field to compare against
 */
export function sameAs(field: string, message?: string): ValidationRule {
  return (value, allValues) => {
    if (!allValues) return true;
    return value === allValues[field]
      ? true
      : message ?? `Must match ${field}`;
  };
}

/** Wrap a predicate into a rule. Return `true`/`false` from `fn`. */
export function custom(
  fn: (value: any, allValues?: Record<string, any>) => boolean,
  message = "Invalid value",
): ValidationRule {
  return (value, allValues) => (fn(value, allValues) ? true : message);
}
