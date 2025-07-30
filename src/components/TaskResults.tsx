import React from 'react';
import { ProcessedTask } from '@/types';
import { cn, getPriorityColor, getPriorityLabel, exportToCSV, exportToJSON } from '@/lib/utils';
import { Download, FileText, Database } from 'lucide-react';

interface TaskResultsProps {
  tasks: ProcessedTask[];
  onClear: () => void;
}

export default function TaskResults({ tasks, onClear }: TaskResultsProps) {
  if (tasks.length === 0) {
    return null;
  }

  const handleExportCSV = () => {
    const exportData = tasks.map(task => ({
      'Original Description': task.originalDescription,
      'Summary': task.summary,
      'Tags': task.tags.join(', '),
      'Priority': task.priority,
      'Priority Label': getPriorityLabel(task.priority),
      'Processed At': new Date(task.processedAt).toLocaleString()
    }));
    
    exportToCSV(exportData, `task-summary-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportJSON = () => {
    const exportData = {
      tasks,
      exportedAt: new Date().toISOString(),
      totalTasks: tasks.length
    };
    
    exportToJSON(exportData, `task-summary-${new Date().toISOString().split('T')[0]}.json`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Processed Tasks</h2>
          <p className="text-sm text-gray-600">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} processed successfully
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Database className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={onClear}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear Results
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task, index) => (
          <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="space-y-3">
              {/* Header with priority and task number */}
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-500">Task {index + 1}</span>
                <span 
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    getPriorityColor(task.priority)
                  )}
                >
                  Priority {task.priority} - {getPriorityLabel(task.priority)}
                </span>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Summary</h3>
                <p className="text-gray-900">{task.summary}</p>
              </div>

              {/* Tags */}
              {task.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Original description (collapsible) */}
              <details className="group">
                <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                  Original Description
                </summary>
                <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-600 border-l-4 border-gray-300">
                  {task.originalDescription}
                </div>
              </details>

              {/* Timestamp */}
              <div className="text-xs text-gray-500">
                Processed: {new Date(task.processedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
