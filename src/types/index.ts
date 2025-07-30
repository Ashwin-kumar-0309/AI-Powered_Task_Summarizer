export interface RawTask {
  id: string;
  description: string;
}

export interface ProcessedTask {
  id: string;
  originalDescription: string;
  summary: string;
  tags: string[];
  priority: number;
  processedAt: string;
}

export interface AIProcessingRequest {
  tasks: RawTask[];
}

export interface AIProcessingResponse {
  processedTasks: ProcessedTask[];
  success: boolean;
  error?: string;
}

export interface ExportData {
  tasks: ProcessedTask[];
  exportedAt: string;
  totalTasks: number;
}
