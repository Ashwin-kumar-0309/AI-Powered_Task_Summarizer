import React from 'react';
import { RawTask } from '@/types';
import { cn } from '@/lib/utils';
import { Plus, X } from 'lucide-react';

interface TaskInputProps {
  tasks: RawTask[];
  onTasksChange: (tasks: RawTask[]) => void;
  isProcessing: boolean;
}

export default function TaskInput({ tasks, onTasksChange, isProcessing }: TaskInputProps) {
  const addTask = () => {
    const newTask: RawTask = {
      id: Math.random().toString(36).substr(2, 9),
      description: ''
    };
    onTasksChange([...tasks, newTask]);
  };

  const updateTask = (id: string, description: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, description } : task
    );
    onTasksChange(updatedTasks);
  };

  const removeTask = (id: string) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    onTasksChange(filteredTasks);
  };

  const clearAllTasks = () => {
    onTasksChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Task Input</h2>
        <div className="flex gap-2">
          {tasks.length > 0 && (
            <button
              onClick={clearAllTasks}
              disabled={isProcessing}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
            >
              Clear All
            </button>
          )}
          <button
            onClick={addTask}
            disabled={isProcessing || tasks.length >= 20}
            className={cn(
              "flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No tasks added yet. Click "Add Task" to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={task.id} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task {index + 1}
              </label>
              <div className="relative">
                <textarea
                  value={task.description}
                  onChange={(e) => updateTask(task.id, e.target.value)}
                  disabled={isProcessing}
                  placeholder="Enter a messy, unstructured task description here..."
                  className={cn(
                    "w-full p-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none",
                    "disabled:bg-gray-50 disabled:cursor-not-allowed"
                  )}
                  rows={3}
                />
                <button
                  onClick={() => removeTask(task.id)}
                  disabled={isProcessing}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tasks.length >= 20 && (
        <p className="text-sm text-amber-600">
          Maximum of 20 tasks can be processed at once.
        </p>
      )}
    </div>
  );
}
