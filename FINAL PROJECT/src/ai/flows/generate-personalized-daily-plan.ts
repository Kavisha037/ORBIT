'use server';

/**
 * @fileOverview Generates a personalized daily plan for students by integrating skill-building tasks into their free time.
 *
 * - generatePersonalizedDailyPlan - A function that generates the personalized daily plan.
 * - GeneratePersonalizedDailyPlanInput - The input type for the generatePersonalizedDailyPlan function.
 * - GeneratePersonalizedDailyPlanOutput - The return type for the generatePersonalizedDailyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedDailyPlanInputSchema = z.object({
  name: z.string().describe('The name of the student.'),
  field: z.string().describe("The student's field of study (e.g., Engineering, Medical)."),
  year: z.string().describe("The student's year of study."),
  semester: z.string().describe("The student's current semester."),
  skillPath: z.string().describe('The chosen skill path (e.g., coding, design, video editing).'),
  previousTasksCompleted: z.array(z.string()).optional().describe('List of tasks completed from the previous day.'),
  previousTasksSkipped: z.array(z.string()).optional().describe('List of tasks skipped from the previous day.'),
});
export type GeneratePersonalizedDailyPlanInput = z.infer<typeof GeneratePersonalizedDailyPlanInputSchema>;

const GeneratePersonalizedDailyPlanOutputSchema = z.object({
  dailyPlan: z.array(
    z.object({
      time: z.string().describe('The time slot for the task.'),
      task: z.string().describe('The skill-building task for the time slot.'),
      duration: z.string().describe('The estimated duration of the task.'),
    })
  ).describe('A list of skill-building tasks integrated into the student\'s free time slots.'),
});
export type GeneratePersonalizedDailyPlanOutput = z.infer<typeof GeneratePersonalizedDailyPlanOutputSchema>;

export async function generatePersonalizedDailyPlan(input: GeneratePersonalizedDailyPlanInput): Promise<GeneratePersonalizedDailyPlanOutput> {
  return generatePersonalizedDailyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedDailyPlanPrompt',
  input: {schema: GeneratePersonalizedDailyPlanInputSchema},
  output: {schema: GeneratePersonalizedDailyPlanOutputSchema},
  prompt: `You are an AI assistant helping college students create personalized daily plans that incorporate skill-building tasks around their assumed college schedule.

  Student Name: {{{name}}}
  Field of Study: {{{field}}}
  Year: {{{year}}}
  Semester: {{{semester}}}
  Skill Path: {{{skillPath}}}
  Previous Tasks Completed: {{#if previousTasksCompleted}}{{{previousTasksCompleted}}}{{else}}None{{/if}}
  Previous Tasks Skipped: {{#if previousTasksSkipped}}{{{previousTasksSkipped}}}{{else}}None{{/if}}

  Based on the student's field of study, year, semester, and skill path, infer a typical daily college schedule and generate a daily plan that fits skill-building tasks into their free time. Assume a standard college schedule with classes, breaks, and study time.

  The daily plan should include specific tasks, the time slot for each task, and the estimated duration of each task. Ensure the tasks are relevant to the chosen skill path and are adjusted based on the student's progress (or lack thereof) from previous days.

  Return the daily plan in a structured format.
  `,
});

const generatePersonalizedDailyPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedDailyPlanFlow',
    inputSchema: GeneratePersonalizedDailyPlanInputSchema,
    outputSchema: GeneratePersonalizedDailyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
