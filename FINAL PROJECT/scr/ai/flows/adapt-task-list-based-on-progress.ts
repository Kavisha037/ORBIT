'use server';

/**
 * @fileOverview Adapts the task list based on the student's progress.
 *
 * This file defines a Genkit flow that takes into account the student's daily check-in responses
 * to adjust the difficulty, duration, and future plans of their skill-building tasks.
 *
 * @exports {
 *   adaptTaskListBasedOnProgress: (input: AdaptTaskListBasedOnProgressInput) => Promise<AdaptedTaskListOutput>;
 *   AdaptTaskListBasedOnProgressInput: z.infer<typeof AdaptTaskListBasedOnProgressInputSchema>;
 *   AdaptedTaskListOutput: z.infer<typeof AdaptedTaskListOutputSchema>;
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const AdaptTaskListBasedOnProgressInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  skillPath: z.string().describe('The chosen skill path (e.g., coding, design).'),
  currentTasks: z.array(z.string()).describe('The list of current tasks.'),
  taskCompletionStatus: z
    .array(z.boolean())
    .describe('An array of booleans indicating whether each task was completed (true) or not (false).'),
  feedback: z.string().optional().describe('Optional feedback from the student about the tasks.'),
});
export type AdaptTaskListBasedOnProgressInput = z.infer<typeof AdaptTaskListBasedOnProgressInputSchema>;

// Define the output schema
const AdaptedTaskListOutputSchema = z.object({
  adaptedTasks: z.array(z.string()).describe('The adapted list of tasks for the next day.'),
  explanation: z.string().describe('Explanation of why the tasks were adapted this way.'),
});
export type AdaptedTaskListOutput = z.infer<typeof AdaptedTaskListOutputSchema>;

// Exported function to call the flow
export async function adaptTaskListBasedOnProgress(
  input: AdaptTaskListBasedOnProgressInput
): Promise<AdaptedTaskListOutput> {
  return adaptTaskListBasedOnProgressFlow(input);
}

const adaptTaskListPrompt = ai.definePrompt({
  name: 'adaptTaskListPrompt',
  input: {schema: AdaptTaskListBasedOnProgressInputSchema},
  output: {schema: AdaptedTaskListOutputSchema},
  prompt: `You are an AI skill adaptation assistant, responsible for adapting a list of skill-building tasks for a student based on their progress.

  Student Name: {{{studentName}}}
  Skill Path: {{{skillPath}}}

  Current Tasks:
  {{#each currentTasks}}
  - {{{this}}}
  {{/each}}

  Task Completion Status: 
  {{#each taskCompletionStatus}}
  - {{{this}}}
  {{/each}}

  Feedback: {{{feedback}}}

  Based on the student's completion status and feedback, adapt the list of tasks for the next day. Consider the following:

  - If the student completed all tasks, increase the difficulty or duration of some tasks, or add new, more challenging tasks.
  - If the student skipped some tasks, keep those tasks for the next day, reduce the difficulty or duration, or replace them with easier tasks. Ask the student if they are willing to work on the tasks that they skipped.
  - Use the feedback to understand the student's preferences and adjust the tasks accordingly.

  Return the adapted list of tasks and a brief explanation of why the tasks were adapted this way.
  `,
});

// Define the Genkit flow
const adaptTaskListBasedOnProgressFlow = ai.defineFlow(
  {
    name: 'adaptTaskListBasedOnProgressFlow',
    inputSchema: AdaptTaskListBasedOnProgressInputSchema,
    outputSchema: AdaptedTaskListOutputSchema,
  },
  async input => {
    const {output} = await adaptTaskListPrompt(input);
    return output!;
  }
);
