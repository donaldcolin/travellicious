import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and resolves any Tailwind CSS conflicts
 * @param {...string} inputs - Class names to combine
 * @returns {string} - Combined class name string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
