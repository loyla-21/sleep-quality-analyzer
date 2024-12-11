// components/sleep-input-form.tsx
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SleepData } from '@/types/sleep';

interface SleepInputFormProps {
  sleepData: SleepData;
  setSleepData: React.Dispatch<React.SetStateAction<SleepData>>;
  onSubmit: () => void;
}

export function SleepInputForm({ 
  sleepData, 
  setSleepData, 
  onSubmit 
}: SleepInputFormProps) {
  const handleInputChange = (field: keyof SleepData, value: string | number) => {
    setSleepData(prev => ({
      ...prev,
      [field]: typeof value === 'string' 
        ? value 
        : (field === 'energyLevel' ? parseInt(value.toString()) : parseFloat(value.toString()))
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Log Detailed Sleep Data</h3>
      <div className="space-y-4">
        <Input 
          type="time" 
          placeholder="Bedtime" 
          onChange={(e) => handleInputChange('bedtime', e.target.value)}
        />
        <Input 
          type="time" 
          placeholder="Wake Time" 
          onChange={(e) => handleInputChange('wakeTime', e.target.value)}
        />
        <Input 
          type="number" 
          placeholder="Deep Sleep (hours)" 
          step="0.1"
          onChange={(e) => handleInputChange('deepSleep', e.target.value)}
        />
        <Input 
          type="number" 
          placeholder="Light Sleep (hours)" 
          step="0.1"
          onChange={(e) => handleInputChange('lightSleep', e.target.value)}
        />
        <Input 
          type="number" 
          placeholder="REM Sleep (hours)" 
          step="0.1"
          onChange={(e) => handleInputChange('remSleep', e.target.value)}
        />
        <Input 
          type="number" 
          placeholder="Energy Level (1-10)" 
          min="1" 
          max="10"
          onChange={(e) => handleInputChange('energyLevel', e.target.value)}
        />
        <Button onClick={onSubmit} className="w-full">
          Log Sleep Data
        </Button>
      </div>
    </div>
  );
}

