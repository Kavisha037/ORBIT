import { config } from 'dotenv';
config();

import '@/ai/flows/generate-personalized-daily-plan.ts';
import '@/ai/flows/adapt-task-list-based-on-progress.ts';
import '@/ai/flows/chatbot-flow.ts';
import '@/ai/flows/generate-progress-insights.ts';
