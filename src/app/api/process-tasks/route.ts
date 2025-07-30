import { NextRequest, NextResponse } from 'next/server';
import { processTasksWithAI, validateOpenAIKey } from '@/lib/openai';
import { AIProcessingRequest, AIProcessingResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Validate OpenAI API key
    if (!validateOpenAIKey()) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' 
        } as AIProcessingResponse,
        { status: 500 }
      );
    }

    const body: AIProcessingRequest = await request.json();
    
    if (!body.tasks || !Array.isArray(body.tasks) || body.tasks.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid tasks data. Please provide an array of tasks.' 
        } as AIProcessingResponse,
        { status: 400 }
      );
    }

    // Limit to reasonable number of tasks to avoid rate limiting
    if (body.tasks.length > 20) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many tasks. Please process up to 20 tasks at a time.' 
        } as AIProcessingResponse,
        { status: 400 }
      );
    }

    const processedTasks = await processTasksWithAI(body.tasks);
    
    return NextResponse.json({
      success: true,
      processedTasks
    } as AIProcessingResponse);

  } catch (error) {
    console.error('API Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to process tasks: ${errorMessage}` 
      } as AIProcessingResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Task processing API endpoint. Use POST to submit tasks for processing.',
    status: 'ready',
    hasApiKey: validateOpenAIKey()
  });
}
