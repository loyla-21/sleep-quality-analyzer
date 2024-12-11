'use client';

import { useEffect, useState } from 'react';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query'
import { SleepStats } from '@/components/sleep-stats';
import { SleepChart } from '@/components/sleep-chart';
import { AIRecommendations } from '@/components/ai-recommendations';
import { SleepData, AIRecommendations as AIRecommendationType } from '@/types/sleep';
import { generateComprehensiveRecommendations } from '@/lib/sleep-ai';

import { calculateSleepDuration, calculateQualityScore } from '@/lib/utils';
import { SleepInputModal } from '@/components/sleep-input-modal';
import { Loader2 } from 'lucide-react'; // Import a loading icon

export default function Dashboard() {
  const [sleepData, setSleepData] = useState<SleepData>({
    bedtime: '',
    wakeTime: '',
    sleepDuration: 0,
    deepSleep: 0,
    lightSleep: 0,
    remSleep: 0,
    awake: 0,
    sleepQualityRating: 0,
    interruptions: 0,
    energyLevel: 0
  });

  const [sleepHistory, setSleepHistory] = useState<SleepData[]>([]);
  const queryClient = useQueryClient()

  // AI Recommendations Query with loading and error states
  const { 
    data: aiRecommendations, 
    isLoading: isAILoading, 
    error: aiError 
  } = useQuery<AIRecommendationType>({
    queryKey: ['aiRecommendations'],
    // Add a placeholder or default data
    initialData: {
      responseText: '[Enter sleep data to get started]',
      severityScore: 0
    },
    // Optional: add a refetch interval or disable automatic refetching
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  // AI Recommendations Mutation
  const aiRecommendationsMutation = useMutation({
    mutationFn: generateComprehensiveRecommendations,
    onSuccess: (data) => {
      // Update the query cache with new AI recommendations
      queryClient.setQueryData(['aiRecommendations'], data)
    }
  });

  const handleSleepDataSubmit = async () => {
    // Validate sleep data before submission
    if (!sleepData.bedtime || !sleepData.wakeTime) {
      console.error('Please provide bedtime and wake time');
      return;
    }

    const duration = calculateSleepDuration(sleepData.bedtime, sleepData.wakeTime);
    const enhancedSleepData = {
      ...sleepData,
      date: new Date().toISOString(),
      sleepDuration: duration,
      sleepQualityRating: calculateQualityScore({
        ...sleepData,
        sleepDuration: duration
      })
    };
  
    // Update local sleep history
    setSleepHistory(prev => [...prev, enhancedSleepData]);
  
    // Trigger AI recommendations mutation
    try {
      await aiRecommendationsMutation.mutateAsync([enhancedSleepData]);
    } catch (error) {
      console.error('Failed to generate AI recommendations', error);
    }
  };

  console.log("aiRecommendations",aiRecommendations)

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-[85rem] mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Sleep Dashboard</h1>
          <SleepInputModal
            sleepData={sleepData}
            setSleepData={setSleepData}
            onSubmit={handleSleepDataSubmit}
          />
        </div>
        
        <SleepStats sleepHistory={sleepHistory} />
        
        <div className="grid grid-cols-1 dark:text-black md:grid-cols-5 gap-4">
          <div className="md:col-span-3">
            <SleepChart sleepHistory={sleepHistory} />
          </div>
          <div className="md:col-span-2">
            {/* Conditional rendering for AI Recommendations */}
            {isAILoading ? (
              <div className="bg-gray-200 p-6 rounded-lg flex justify-center items-center">
                <Loader2 className="animate-spin text-purple-600" size={32} />
                <span className="ml-2 text-gray-700">Generating AI insights...</span>
              </div>
            ) : aiError ? (
              <div className="bg-red-100 p-6 rounded-lg text-red-800">
                Failed to generate AI recommendations. Please try again.
              </div>
            ) : (
              <AIRecommendations recommendations={aiRecommendations} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}