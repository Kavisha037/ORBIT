'use server';

/**
 * @fileOverview Generates personalized progress insights for a student.
 *
 * This file defines a Genkit flow that analyzes a student's learning data,
 * including academic performance, skill-building progress, and study habits,
 * to provide structured, actionable recommendations.
 *
 * @exports {
 *   generateProgressInsights: (input: ProgressInsightsInput) => Promise<ProgressInsightsOutput>;
 *   ProgressInsightsInput: z.infer<typeof ProgressInsightsInputSchema>;
 *   ProgressInsightsOutput: z.infer<typeof ProgressInsightsOutputSchema>;
 * }
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the progress insights flow
const ProgressInsightsInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  academicData: z
    .array(
      z.object({
        subject: z.string(),
        chapter: z.string(),
        completionStatus: z.enum(['completed', 'in-progress', 'not-started']),
        accuracy: z.number().optional().describe('Practice question accuracy (0-100).'),
        studyTime: z.number().describe('Time spent studying in minutes.'),
      })
    )
    .describe("The student's academic performance data."),
  skillData: z
    .object({
      skillPath: z.string(),
      completedTasks: z.array(z.string()),
      skippedTasks: z.array(z.string()),
      totalTimeSpent: z.number().describe('Total time spent on skills in minutes.'),
    })
    .describe("The student's skill-learning progress."),
  focusModeUsage: z
    .object({
      totalSessions: z.number(),
      totalTime: z.number().describe('Total time in focus mode in minutes.'),
    })
    .describe('Usage data for the focus mode feature.'),
});
export type ProgressInsightsInput = z.infer<typeof ProgressInsightsInputSchema>;

// Define the output schema for the progress insights flow
const ProgressInsightsOutputSchema = z.object({
  overallSummary: z.string().describe("A brief, objective summary of the student's progress."),
  weakTopics: z
    .array(
      z.object({
        subject: z.string(),
        topic: z.string(),
        reason: z.string().describe('Why this topic is considered weak (e.g., low accuracy, low study time).'),
      })
    )
    .describe('A list of topics or chapters where the student is struggling.'),
  recommendations: z
    .object({
      nextAcademicTopic: z.string().describe('The suggested next academic chapter/topic to study.'),
      nextSkillTask: z.string().describe('The suggested next skill-building task.'),
      timeAllocation: z
        .string()
        .describe('Recommended daily time allocation between academics and skills (e.g., "60% academics, 40% skills").'),
      focusSessionSuggestion: z
        .string()
        .describe('A suggestion on whether to increase focus mode usage.'),
    })
    .describe('Actionable recommendations for the student.'),
  motivationalTip: z.string().describe('A short, encouraging tip to keep the student engaged.'),
});
export type ProgressInsightsOutput = z.infer<typeof ProgressInsightsOutputSchema>;

// Exported function to call the flow
export async function generateProgressInsights(
  input: ProgressInsightsInput
): Promise<ProgressInsightsOutput> {
  return generateProgressInsightsFlow(input);
}

const progressInsightsPrompt = ai.definePrompt({
  name: 'progressInsightsPrompt',
  input: { schema: ProgressInsightsInputSchema },
  output: { schema: ProgressInsightsOutputSchema },
  prompt: `You are an AI academic and skill-learning assistant for a student named {{{studentName}}}.
  Your role is to objectively evaluate the student's progress based on the structured data provided. Do not make assumptions.

  Analyze the following data:
  - Academic Progress: {{json academicData}}
  - Skill Progress ({{skillData.skillPath}}): {{json skillData}}
  - Focus Mode Usage: {{json focusModeUsage}}

  Based on your analysis, perform the following tasks:
  1.  **Identify Weak Topics**: Analyze the academic data to find chapters with low accuracy, incomplete practice, or insufficient study time.
  2.  **Determine Time Balance**: Evaluate whether the student is spending more time on skills or academics.
  3.  **Generate Recommendations**: Provide clear, actionable suggestions.
      - Suggest the next academic chapter to revise or study.
      - Recommend a daily time allocation between academics and skills.
      - Advise on focus mode usage.
  4.  **Provide Motivation**: Give a short, encouraging tip.

  Return the analysis in a strict JSON format matching the output schema.
  `,
});

// Define the Genkit flow
const generateProgressInsightsFlow = ai.defineFlow(
  {
    name: 'generateProgressInsightsFlow',
    inputSchema: ProgressInsightsInputSchema,
    outputSchema: ProgressInsightsOutputSchema,
  },
  async input => {
    const { output } = await progressInsightsPrompt(input);
    return output!;
  }
);
