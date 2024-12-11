// lib/sleep-ai.ts

"use server"
import { GoogleGenerativeAI } from '@google/generative-ai'
import {
  SleepData,
  AIRecommendations,
  SleepHealthProfile,
  SleepDisorderRisk,
  MentalHealthCorrelation
} from '@/types/sleep'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SLEEP_DISORDER_THRESHOLDS = {
  insomnia: {
    shortSleep: 5,  // Less than 5 hours consistently
    highInterruptions: 3,  // More than 3 interruptions per night
  },
  apnea: {
    irregularBreathing: true,  // Future expansion with wearable data
    snoring: true,
  },
  restlessLegSyndrome: {
    lowDeepSleep: 1,  // Less than 1 hour of deep sleep
    highLightSleep: 5,  // More than 5 hours of light sleep
  }
}

export async function generateComprehensiveRecommendations(
  sleepData: SleepData[]
): Promise<AIRecommendations> {
  // Comprehensive health profile analysis
  const healthProfile = analyzeHealthProfile(sleepData)
  const disorderRisks = detectSleepDisorders(sleepData)
  const mentalHealthCorrelation = analyzeMentalHealthCorrelation(sleepData)

  // Generate AI-powered insights
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const prompt = `Comprehensive Sleep Health Analysis:
    Sleep Data Overview:
    - Average Sleep Duration: ${calculateAverageSleepDuration(sleepData).toFixed(2)} hours
    - Sleep Quality Score: ${calculateAverageSleepQuality(sleepData)}
    - Deep Sleep Percentage: ${calculateDeepSleepPercentage(sleepData)}%
    
    Sleep Disorder Risks:
    ${Object.entries(disorderRisks).map(([disorder, risk]) =>
    `- ${disorder}: ${risk.level} (${risk.explanation})`
  ).join('\n')}
    
    Mental Health Correlation:
    - Stress Impact: ${mentalHealthCorrelation.stressImpact}
    - Mood Variation Correlation: ${mentalHealthCorrelation.moodVariation}
    
    Provide:
    1. Insights about current sleep patterns
    2. Recommendations for sleep improvement
    3. Detailed mental health and sleep correlations
    4. Potential intervention strategies
    5. Long-term health trend suggestions
    `

  try {
    const result = await model.generateContent(prompt)
    const responseText = await result.response.text()
    console.log("responseText:", responseText)
    return {
      responseText,
      severityScore: calculateSeverityScore(healthProfile, disorderRisks),
      additionalData: {
        healthProfile,
        disorderRisks,
        mentalHealthCorrelation
      }
    }
  } catch (error) {
    console.error("Advanced sleep analysis error:", error)
    return generateFallbackRecommendations()
  }
}

function analyzeHealthProfile(sleepData: SleepData[]): SleepHealthProfile {
  return {
    averageSleepDuration: calculateAverageSleepDuration(sleepData),
    averageDeepSleep: calculateAverageDeepSleep(sleepData),
    sleepConsistency: calculateSleepConsistency(sleepData),
    energyLevelTrend: calculateEnergyLevelTrend(sleepData)
  }
}

function detectSleepDisorders(sleepData: SleepData[]): Record<string, SleepDisorderRisk> {
  const latestSleep = sleepData[sleepData.length - 1]

  return {
    insomniaRisk: {
      level: latestSleep.sleepDuration < SLEEP_DISORDER_THRESHOLDS.insomnia.shortSleep
        ? 'High' : 'Low',
      explanation: 'Based on consistently short sleep duration'
    },
    sleepApneaRisk: {
      level: latestSleep.interruptions > 3 ? 'Moderate' : 'Low',
      explanation: 'Assessed through sleep interruption patterns'
    },
    restlessLegSyndrome: {
      level: latestSleep.deepSleep < SLEEP_DISORDER_THRESHOLDS.restlessLegSyndrome.lowDeepSleep
        ? 'Moderate' : 'Low',
      explanation: 'Evaluated through deep sleep duration'
    }
  }
}

function analyzeMentalHealthCorrelation(sleepData: SleepData[]): MentalHealthCorrelation {
  // Placeholder for more advanced mental health correlation
  // In a real-world scenario, this would integrate with mood tracking, stress level inputs
  return {
    stressImpact: calculateStressImpact(sleepData),
    moodVariation: calculateMoodVariation(sleepData),
    potentialInterventions: [
      'Cognitive Behavioral Therapy for Insomnia (CBT-I)',
      'Mindfulness and relaxation techniques',
      'Stress management workshops'
    ]
  }
}

function calculateAverageDeepSleep(sleepData: SleepData[]): number {
  return sleepData.reduce((sum, data) => sum + data.deepSleep, 0) / sleepData.length
}

// Utility calculation methods (simplified placeholders)
function calculateAverageSleepDuration(sleepData: SleepData[]): number {
  return sleepData.reduce((sum, data) => sum + data.sleepDuration, 0) / sleepData.length
}

function calculateAverageSleepQuality(sleepData: SleepData[]): number {
  return sleepData.reduce((sum, data) => sum + (data.sleepQualityRating || 0), 0) / sleepData.length
}

function calculateDeepSleepPercentage(sleepData: SleepData[]): number {
  const totalSleep = sleepData.reduce((sum, data) => sum + data.sleepDuration, 0)
  const totalDeepSleep = sleepData.reduce((sum, data) => sum + data.deepSleep, 0)
  return (totalDeepSleep / totalSleep) * 100
}

function calculateSleepConsistency(sleepData: SleepData[]): number {
  // Simplified consistency calculation
  const durations = sleepData.map(data => data.sleepDuration)
  const avgDuration = calculateAverageSleepDuration(sleepData)
  const variance = durations.reduce((sum, duration) => sum + Math.abs(duration - avgDuration), 0) / durations.length
  return Math.max(0, 100 - (variance * 20))  // Higher score means more consistent
}

function calculateEnergyLevelTrend(sleepData: SleepData[]): number {
  return sleepData.reduce((sum, data) => sum + (data.energyLevel || 0), 0) / sleepData.length
}

function calculateStressImpact(sleepData: SleepData[]): string {
  // Placeholder for stress impact calculation
  return sleepData.length > 5
    ? 'Moderate negative correlation with sleep quality'
    : 'Insufficient data'
}

function calculateMoodVariation(sleepData: SleepData[]): string {
  // Placeholder for mood variation analysis
  return sleepData.length > 7
    ? 'Potential mood instability detected'
    : 'Insufficient tracking data'
}

function calculateSeverityScore(
  healthProfile: SleepHealthProfile,
  disorderRisks: Record<string, SleepDisorderRisk>
): number {
  // Complex severity scoring algorithm
  let score = 5  // Baseline

  if (healthProfile.averageSleepDuration < 6) score += 2
  if (healthProfile.averageDeepSleep < 1.5) score += 1

  Object.values(disorderRisks).forEach(risk => {
    if (risk.level === 'High') score += 2
    if (risk.level === 'Moderate') score += 1
  })

  return Math.min(score, 10)
}

function generateFallbackRecommendations(): AIRecommendations {
  return {
    responseText: 'No AI-generated recommendations available.',
    severityScore: 0
  }
}


