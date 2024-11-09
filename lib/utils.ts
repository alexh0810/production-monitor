import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateMockData = (): { weight: number; timestamp: string } => {
  const baseWeight = 250;
  return {
    weight: baseWeight + (Math.random() * 10 - 5),
    timestamp: new Date().toISOString(),
  };
};
