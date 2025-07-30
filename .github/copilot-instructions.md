# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context
This is a Smart Task Summarizer + Tagger application built with Next.js, TypeScript, and Tailwind CSS. The application:

- Takes messy, unstructured task descriptions as input
- Uses OpenAI GPT-4 API to process and summarize tasks
- Auto-tags tasks with relevant categories (#urgent, #frontend, #client, etc.)
- Assigns priority scores (1-5)
- Provides export functionality for results

## Key Technologies
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **AI Integration**: OpenAI GPT-4 API
- **Backend**: Next.js API routes
- **State Management**: React hooks
- **Styling**: Tailwind CSS with responsive design

## Code Style Guidelines
- Use TypeScript interfaces for all data structures
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling with consistent design system
- Implement proper error handling for AI API calls
- Use environment variables for sensitive API keys
- Follow React best practices with proper hooks usage

## AI Prompt Engineering
- Design prompts that consistently return structured JSON responses
- Include clear instructions for task summarization, tagging, and priority scoring
- Handle edge cases where AI responses might be malformed
- Implement fallback strategies for API failures
