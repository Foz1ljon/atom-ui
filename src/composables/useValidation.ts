import { reactive, computed, watch, toRaw } from "vue";
import type { ValidationRule } from "./validators";

export type ValidationSchema<T> = Partial<Record<keyof T, ValidationRule[]>>;

export interface UseValidationOptions {
  /** Validate a field as soon as its value changes. Default: false. */
  validateOnChange?: boolean;
}

export interface UseValidationReturn<T extends Record<string, any>> {
  /** Reactive form values. Bind fields with `v-model="values.field"`. */
  values: T;
  /** Reactive map of field → error message (empty string when valid). */
  errors: Record<keyof T, string>;
  /** Reactive map of field → touched state. */
  touched: Record<keyof T, boolean>;
  /** `true` when every field passes its rules. */
  isValid: import("vue").ComputedRef<boolean>;
  /** `true` when any value differs from the initial state. */
  isDirty: import("vue").ComputedRef<boolean>;
  /** Validate a single field. Returns whether it is valid. */
  validateField: (field: keyof T) => boolean;
  /** Validate every field. Returns whether the whole form is valid. */
  validate: () => boolean;
  /** Mark a field as touched (e.g. on `@blur`) and validate it. */
  touch: (field: keyof T) => void;
  /** Clear the error of one field, or all fields when omitted. */
  clearErrors: (field?: keyof T) => void;
  /** Reset values, errors and touched state back to the initial values. */
  reset: () => void;
  /** Convenience helper: bind blur + error to an `<AtomInput>`. */
  field: (field: keyof T) => {
    modelValue: T[keyof T];
    error: boolean;
    errorMessage: string;
    "onUpdate:modelValue": (val: any) => void;
    onBlur: () => void;
  };
}

/**
 * Lightweight reactive form validation.
 *
 * @example
 * const { values, errors, validate, field } = useValidation(
 *   { email: "", password: "" },
 *   {
 *     email: [required(), email()],
 *     password: [required(), minLength(8)],
 *   }
 * );
 */
export function useValidation<T extends Record<string, any>>(
  initialValues: T,
  schema: ValidationSchema<T> = {},
  options: UseValidationOptions = {},
): UseValidationReturn<T> {
  const { validateOnChange = false } = options;

  const initial = JSON.parse(JSON.stringify(toRaw(initialValues))) as T;

  const values = reactive({ ...initialValues }) as T;

  const errors = reactive(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = "";
      return acc;
    }, {} as Record<keyof T, string>),
  ) as Record<keyof T, string>;

  const touched = reactive(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = false;
      return acc;
    }, {} as Record<keyof T, boolean>),
  ) as Record<keyof T, boolean>;

  function runRules(field: keyof T): string {
    const rules = schema[field];
    if (!rules || rules.length === 0) return "";
    for (const rule of rules) {
      const result = rule(values[field], values as Record<string, any>);
      if (result !== true) return result;
    }
    return "";
  }

  function validateField(field: keyof T): boolean {
    const message = runRules(field);
    errors[field] = message;
    return message === "";
  }

  function validate(): boolean {
    let ok = true;
    for (const key of Object.keys(values) as (keyof T)[]) {
      touched[key] = true;
      if (!validateField(key)) ok = false;
    }
    return ok;
  }

  function touch(field: keyof T): void {
    touched[field] = true;
    validateField(field);
  }

  function clearErrors(field?: keyof T): void {
    if (field) {
      errors[field] = "";
    } else {
      for (const key of Object.keys(errors) as (keyof T)[]) errors[key] = "";
    }
  }

  function reset(): void {
    for (const key of Object.keys(initial) as (keyof T)[]) {
      (values as any)[key] = (initial as any)[key];
      errors[key] = "";
      touched[key] = false;
    }
  }

  const isValid = computed(() =>
    (Object.keys(values) as (keyof T)[]).every((key) => runRules(key) === ""),
  );

  const isDirty = computed(
    () => JSON.stringify(toRaw(values)) !== JSON.stringify(initial),
  );

  if (validateOnChange) {
    watch(
      () => ({ ...values }),
      (_, oldVal) => {
        for (const key of Object.keys(values) as (keyof T)[]) {
          if (touched[key] && values[key] !== (oldVal as any)[key]) {
            validateField(key);
          }
        }
      },
      { deep: true },
    );
  }

  function field(name: keyof T) {
    return {
      modelValue: values[name],
      error: !!errors[name],
      errorMessage: errors[name],
      "onUpdate:modelValue": (val: any) => {
        (values as any)[name] = val;
        if (validateOnChange && touched[name]) validateField(name);
      },
      onBlur: () => touch(name),
    };
  }

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    validateField,
    validate,
    touch,
    clearErrors,
    reset,
    field,
  };
}
