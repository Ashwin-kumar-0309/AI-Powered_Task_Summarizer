'use client';

import React, { useState } from 'react';
import { RawTask, ProcessedTask, AIProcessingRequest, AIProcessingResponse } from '@/types';
import { generateId } from '@/lib/utils';
import TaskInput from '@/components/TaskInput';
import TaskResults from '@/components/TaskResults';
import LoadingState from '@/components/LoadingState';
import SampleTasksLoader from '@/components/SampleTasksLoader';
import { Brain, AlertCircle, CheckCircle } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState<RawTask[]>([]);
  const [processedTasks, setProcessedTasks] = useState<ProcessedTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleTasksChange = (newTasks: RawTask[]) => {
    setTasks(newTasks);
    setError(null);
    setSuccess(null);
  };

  const processTasksWithAI = async () => {
    if (tasks.length === 0) {
      setError('Please add at least one task to process.');
      return;
    }

    const tasksWithContent = tasks.filter(task => task.description.trim().length > 0);
    if (tasksWithContent.length === 0) {
      setError('Please add content to at least one task.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const request: AIProcessingRequest = {
        tasks: tasksWithContent
      };

      const response = await fetch('/api/process-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data: AIProcessingResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to process tasks');
      }

      setProcessedTasks(data.processedTasks);
      setSuccess(`Successfully processed ${data.processedTasks.length} task${data.processedTasks.length !== 1 ? 's' : ''}!`);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);

    } catch (err) {
      console.error('Error processing tasks:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearResults = () => {
    setProcessedTasks([]);
    setSuccess(null);
  };

  const validTasksCount = tasks.filter(task => task.description.trim().length > 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Smart Task Summarizer + Tagger
              </h1>
              <p className="text-gray-600">
                Transform messy task descriptions into organized, prioritized action items using AI
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Error/Success Messages */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p>{success}</p>
          </div>
        )}

        {/* Sample Tasks Loader */}
        {tasks.length === 0 && (
          <SampleTasksLoader 
            onLoadSampleTasks={setTasks}
            disabled={isProcessing}
          />
        )}

        {/* Task Input Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <TaskInput
            tasks={tasks}
            onTasksChange={handleTasksChange}
            isProcessing={isProcessing}
          />

          {/* Process Button */}
          {tasks.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {validTasksCount} task{validTasksCount !== 1 ? 's' : ''} ready for processing
                </div>
                <button
                  onClick={processTasksWithAI}
                  disabled={isProcessing || validTasksCount === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  <Brain className="w-5 h-5" />
                  {isProcessing ? 'Processing...' : 'Process with AI'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isProcessing && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <LoadingState message="Analyzing tasks and generating summaries, tags, and priorities..." />
          </div>
        )}

        {/* Results Section */}
        {processedTasks.length > 0 && (
          <div id="results-section" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <TaskResults
              tasks={processedTasks}
              onClear={clearResults}
            />
          </div>
        )}

        {/* Instructions */}
        {tasks.length === 0 && processedTasks.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">How it works</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-4 border border-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Input Tasks</h4>
                <p className="text-gray-600">Add messy, unstructured task descriptions from meetings, notes, or anywhere</p>
              </div>
              <div className="text-center p-4 border border-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">AI Processing</h4>
                <p className="text-gray-600">GPT-4o-mini analyzes and creates clear summaries with smart tags and priorities</p>
              </div>
              <div className="text-center p-4 border border-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Export Results</h4>
                <p className="text-gray-600">Download organized tasks as CSV or JSON for your project management tools</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js, TypeScript, Tailwind CSS, and OpenAI GPT-4o-mini</p>
            <p className="mt-1">Transform your messy tasks into organized action items</p>
          </div>
        </div>
      </div>
    </div>
  );
}
