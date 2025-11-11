// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn(...classes) → стабилен merge на Tailwind класи
 * Користено од shadcn/ui компоненти (button, input, badge,...)
 */
export function cn(...inputs) {
  // Важно: spread за да работи со varargs од clsx
  return twMerge(clsx(...inputs));
}
