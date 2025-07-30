import React from 'react';
import { RawTask } from '@/types';
import { SAMPLE_TASKS } from '@/lib/sample-data';
import { FileText, Shuffle } from 'lucide-react';

interface SampleTasksLoaderProps {
  onLoadSampleTasks: (tasks: RawTask[]) => void;
  disabled?: boolean;
}

export default function SampleTasksLoader({ onLoadSampleTasks, disabled }: SampleTasksLoaderProps) {
  const loadAllSamples = () => {
    onLoadSampleTasks(SAMPLE_TASKS);
  };

  const loadRandomSamples = () => {
    const shuffled = [...SAMPLE_TASKS].sort(() => 0.5 - Math.random());
    const selectedTasks = shuffled.slice(0, 5 + Math.floor(Math.random() * 5)); // 5-9 random tasks
    onLoadSampleTasks(selectedTasks);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-blue-900">Quick Start with Sample Tasks</h3>
      </div>
      
      <p className="text-sm text-blue-700">
        Try the app with pre-made messy task descriptions that simulate real-world scenarios.
      </p>
      
      <div className="flex gap-2">
        <button
          onClick={loadAllSamples}
          disabled={disabled}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileText className="w-4 h-4" />
          Load All Samples ({SAMPLE_TASKS.length})
        </button>
        
        <button
          onClick={loadRandomSamples}
          disabled={disabled}
          className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shuffle className="w-4 h-4" />
          Load Random Sample
        </button>
      </div>
    </div>
  );
}
