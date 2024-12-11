import { SleepData } from '../types/sleep';

export const calculateSleepDuration = (bedtime: string, wakeTime: string): number => {
  const bed = new Date(`2023-01-01T${bedtime}`);
  const wake = new Date(`2023-01-01T${wakeTime}`);
  
  // Explicitly type the subtraction
  const duration = (wake.getTime() - bed.getTime()) / (1000 * 60 * 60);
  return duration > 0 ? duration : 24 + duration;
};

export const calculateQualityScore = (data: SleepData): number => {
  let score = 100;
  const weightedFactors = [
    { factor: 'sleepDuration', weight: 0.3, optimal: [7, 9] },
    { factor: 'deepSleep', weight: 0.2, optimal: [1.5, 2.5] },
    { factor: 'remSleep', weight: 0.2, optimal: [1.0, 2.0] },
    { factor: 'interruptions', weight: 0.2, optimal: [0, 1] },
    { factor: 'energyLevel', weight: 0.1, optimal: [7, 10] }
  ];

  weightedFactors.forEach(({ factor, weight, optimal }) => {
    // Explicitly handle potential undefined or null values
    const value = data[factor as keyof SleepData];
    const [min, max] = optimal;
    
    // Add type guard and conversion
    if (typeof value === 'number' && (value < min || value > max)) {
      const deviation = Math.abs(value - ((min + max) / 2));
      score -= deviation * weight * 10;
    }
  });

  return Math.max(0, Math.min(100, score));
};

// Existing clsx and twMerge utility
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

