export type AtomNumberInputSize = "sm" | "md" | "lg";

export interface AtomNumberInputProps {
  modelValue?: number | null;
  min?: number;
  max?: number;
  step?: number;
  /**
   * Number of decimal places allowed.
   * `0` = integers only, a positive number caps the decimals,
   * `undefined` = unrestricted decimals.
   */
  precision?: number;
  disabled?: boolean;
  readonly?: boolean;
  size?: AtomNumberInputSize;
  placeholder?: string;
  /** Show the +/- stepper buttons. */
  controls?: boolean;
  error?: boolean;
  label?: string;
  prefix?: string;
  suffix?: string;
}

export interface AtomNumberInputEmits {
  (e: "update:modelValue", value: number | null): void;
  (e: "change", value: number | null): void;
  (e: "focus"): void;
  (e: "blur"): void;
}
