// types/sleep.ts
export interface SleepData {
  date?: string;
  bedtime: string;
  wakeTime: string;
  sleepDuration: number;
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
  awake: number;
  sleepQualityRating: number;
  interruptions: number;
  energyLevel: number;
  sleepQualityScore?: number;
}

export interface SleepHealthProfile {
  averageSleepDuration: number;
  averageDeepSleep: number;
  sleepConsistency: number;
  energyLevelTrend: number;
}

export interface SleepDisorderRisk {
  level: 'Low' | 'Moderate' | 'High';
  explanation: string;
}

export interface MentalHealthCorrelation {
  stressImpact: string;
  moodVariation: string;
  potentialInterventions: string[];
}

export interface AIRecommendations {
  responseText: string;
  severityScore: number;
  additionalData?: {
    healthProfile?: SleepHealthProfile;
    disorderRisks?: Record<string, SleepDisorderRisk>;
    mentalHealthCorrelation?: MentalHealthCorrelation;
  };
}

export interface UserProfile {
  age?: number;
  gender?: string;
  medicalHistory?: string[];
  lifestyle?: {
    exerciseFrequency?: number;
    stressLevel?: number;
    dietType?: string;
  };
}

