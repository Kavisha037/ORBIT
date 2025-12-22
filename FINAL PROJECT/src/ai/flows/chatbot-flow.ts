'use server';

/**
 * @fileOverview A simple chatbot flow for educational and personal questions.
 *
 * - chatbot - A function that handles the conversation.
 */

import { ai } from '@/ai/genkit';
import type { ChatbotInput, ChatbotOutput } from '@/lib/types';
import { ChatbotInputSchema, ChatbotOutputSchema } from '@/lib/types';

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  prompt: `You are a helpful AI assistant for a college student using an app called ORBIT. Your name is 'Flow'.
  You are designed to answer educational questions and help with personal productivity. Be friendly, concise, and encouraging.

  Here is the conversation history:
  {{#if history}}
    {{#each history}}
      {{#if (eq this.role 'user')}}
        User: {{{this.text}}}
      {{else}}
        Flow: {{{this.text}}}
      {{/if}}
    {{/each}}
  {{/if}}

  New message from the user:
  User: {{{message}}}
  
  Your response should be just the text of what Flow would say.
  `,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
