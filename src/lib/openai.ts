import OpenAI from 'openai';
import { RawTask, ProcessedTask } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function processTasksWithAI(tasks: RawTask[]): Promise<ProcessedTask[]> {
  try {
    const prompt = `
You are a task management AI assistant. Your job is to process messy, unstructured task descriptions and clean them up.

For each task, you need to:
1. Create a clear, concise summary (1-2 sentences max)
2. Add 1-2 relevant tags from this list: #urgent, #bug-fix, #feature, #frontend, #backend, #client, #meeting, #infrastructure, #security, #testing, #analytics, #mobile, #design, #api, #database, #marketing
3. Assign a priority score from 1-5 where:
   - 1 = Very Low (nice to have, no rush)
   - 2 = Low (can wait a week or two)
   - 3 = Medium (should be done this week)
   - 4 = High (needs attention soon, within 1-2 days)
   - 5 = Critical (urgent, needs immediate attention)

Tasks to process:
${tasks.map((task, index) => `${index + 1}. ${task.description}`).join('\n')}

Return ONLY a valid JSON array with this exact structure for each task:
[
  {
    "id": "original_task_id",
    "summary": "clear summary here",
    "tags": ["#tag1", "#tag2"],
    "priority": 3
  }
]

Important: Return only the JSON array, no additional text or formatting.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a precise task management assistant. Always return valid JSON exactly as requested."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const response = completion.choices[0]?.message?.content?.trim();
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    let aiResults;
    try {
      aiResults = JSON.parse(response);
    } catch (parseError) {
      console.error('Failed to parse AI response:', response);
      throw new Error('Invalid JSON response from AI');
    }

    if (!Array.isArray(aiResults)) {
      throw new Error('AI response is not an array');
    }

    const processedTasks: ProcessedTask[] = aiResults.map((result, index) => {
      const originalTask = tasks[index];
      return {
        id: originalTask.id,
        originalDescription: originalTask.description,
        summary: result.summary || 'Failed to generate summary',
        tags: Array.isArray(result.tags) ? result.tags : [],
        priority: typeof result.priority === 'number' ? Math.max(1, Math.min(5, result.priority)) : 3,
        processedAt: new Date().toISOString()
      };
    });

    return processedTasks;
  } catch (error) {
    console.error('Error processing tasks with AI:', error);
    throw error;
  }
}

export function validateOpenAIKey(): boolean {
  return !!process.env.OPENAI_API_KEY;
}
