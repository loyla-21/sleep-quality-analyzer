import React, { useMemo } from 'react';
import { Moon, Clock, Activity, Battery } from 'lucide-react';
import { SleepData } from '@/types/sleep';

interface SleepStatsProps {
  sleepHistory: SleepData[];
}

export function SleepStats({ sleepHistory }: SleepStatsProps) {
  const sleepStats = useMemo(() => {
    if (sleepHistory.length === 0) return null;
    
    const latestEntry = sleepHistory[sleepHistory.length - 1];
    return [
      { 
        icon: Clock, 
        label: 'Sleep Duration', 
        value: `${typeof latestEntry.sleepDuration === 'number' 
          ? latestEntry.sleepDuration.toFixed(2) 
          : 'N/A'}h`, 
        change: '+22m' 
      },
      { 
        icon: Activity, 
        label: 'Sleep Quality', 
        value: `${typeof latestEntry.sleepQualityScore === 'number' 
          ? latestEntry.sleepQualityScore.toFixed(0) 
          : 'N/A'}%`, 
        change: '+4%' 
      },
      { 
        icon: Moon, 
        label: 'Deep Sleep', 
        value: `${typeof latestEntry.deepSleep === 'number' 
          ? latestEntry.deepSleep.toFixed(2) 
          : 'N/A'}h`, 
        change: '+18m' 
      },
      { 
        icon: Battery, 
        label: 'Energy Score', 
        value: `${typeof latestEntry.energyLevel === 'number' 
          ? latestEntry.energyLevel 
          : 'N/A'}`, 
        change: '+6' 
      }
    ];
  }, [sleepHistory]);

  if (!sleepStats) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-gray-600 font-medium">Sleep Duration</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Activity className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-gray-600 font-medium">Sleep Quality</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Moon className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-gray-600 font-medium">Deep Sleep</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Battery className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-gray-600 font-medium">Energy Score</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {sleepStats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <stat.icon className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-gray-600 font-medium">{stat.label}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}



