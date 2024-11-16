
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
  return twMerge(clsx(inputs))
}

export function getEventDay() {
  return new Date().getUTCDate() - 1;
}