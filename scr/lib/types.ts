import { z } from 'zod';
import type { ProgressInsightsOutput } from './../ai/flows/generate-progress-insights';

export type SkillPath = 'Coding' | 'Design' | 'Video Editing';

export interface UserData {
  name: string;
  field?: string; // Made optional
  course?: string;
  college?: string;
  cgpa?: string;
  year: string;
  semester: string;
  skillPath: SkillPath;
  onboarded: boolean;
}

export interface Task {
  time: string;
  task: string;
  duration: string;
  completed: boolean | null;
}

export interface DailyPlan {
  date: string;
  tasks: Task[];
}

export interface Progress {
  streak: number;
  level: number;
  xp: number;
  achievements: string[];
}

export interface PersonalTimetableEntry {
  time: string;
  activity: string;
}

export interface CollegeTimetableEntry {
  day: string;
  time: string;
  subject: string;
}

// Chatbot types
export type Message = {
  role: 'user' | 'bot';
  text: string;
};

const MessageSchema = z.object({
  role: z.enum(['user', 'bot']),
  text: z.string(),
});

export const ChatbotInputSchema = z.object({
  history: z.array(MessageSchema).optional().describe('The conversation history.'),
  message: z.string().describe("The user's message."),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

export const ChatbotOutputSchema = z.object({
  response: z.string().describe("The chatbot's response."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export type { ProgressInsightsOutput };
