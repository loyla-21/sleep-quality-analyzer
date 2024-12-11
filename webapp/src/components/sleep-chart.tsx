// components/sleep-chart.tsx
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid, 
  Legend 
} from 'recharts';
import { SleepData } from '@/types/sleep';

interface SleepChartProps {
  sleepHistory: SleepData[];
}

export function SleepChart({ sleepHistory }: SleepChartProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Sleep Pattern</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={sleepHistory}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="deepSleep"
              stackId="1"
              stroke="#7C3AED"
              fill="#7C3AED"
              name="Deep Sleep"
            />
            <Area
              type="monotone"
              dataKey="lightSleep"
              stackId="1"
              stroke="#A78BFA"
              fill="#A78BFA"
              name="Light Sleep"
            />
            <Area
              type="monotone"
              dataKey="remSleep"
              stackId="1"
              stroke="#C4B5FD"
              fill="#C4B5FD"
              name="REM Sleep"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

