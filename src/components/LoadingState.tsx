import React from 'react';
import { cn } from '@/lib/utils';
import { Brain, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export default function LoadingState({ 
  message = "Processing tasks with AI...", 
  className 
}: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-8", className)}>
      <div className="relative">
        <Brain className="w-12 h-12 text-blue-600 mb-3" />
        <Loader2 className="w-6 h-6 text-blue-400 animate-spin absolute -bottom-1 -right-1" />
      </div>
      <p className="text-gray-600 text-center max-w-md">
        {message}
      </p>
      <div className="mt-4 flex space-x-1">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}
