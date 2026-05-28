import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Chip.module.css";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  selected?: boolean;
};

export function Chip({ children, className = "", selected = false, ...props }: ChipProps) {
  return (
    <button
      className={`${styles.chip} ${selected ? styles.selected : ""} ${className}`.trim()}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
