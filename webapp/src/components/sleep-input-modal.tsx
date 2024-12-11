import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SleepInputForm } from './sleep-input-form';
import { SleepData } from '@/types/sleep';
import { Plus } from 'lucide-react';

interface SleepInputModalProps {
  sleepData: SleepData;
  setSleepData: React.Dispatch<React.SetStateAction<SleepData>>;
  onSubmit: () => void;
}

export function SleepInputModal({
  sleepData,
  setSleepData,
  onSubmit
}: SleepInputModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = () => {
    onSubmit();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          Start Sleep Log
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Your Sleep Data</DialogTitle>
        </DialogHeader>
        <SleepInputForm
          sleepData={sleepData}
          setSleepData={setSleepData}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

