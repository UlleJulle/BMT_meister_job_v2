import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className = "", id, label, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className={styles.field}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input id={inputId} className={`${styles.input} ${className}`.trim()} {...props} />
    </label>
  );
}
