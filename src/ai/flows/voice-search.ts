'use server';
/**
 * @fileOverview Implements voice search functionality for the app store.
 *
 * - voiceSearch - A function that takes audio data as input and returns search results.
 * - VoiceSearchInput - The input type for the voiceSearch function.
 * - VoiceSearchOutput - The return type for the voiceSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceSearchInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      'Audio data captured from the microphone, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type VoiceSearchInput = z.infer<typeof VoiceSearchInputSchema>;

const VoiceSearchOutputSchema = z.object({
  searchText: z.string().describe('The text derived from the audio data.'),
});
export type VoiceSearchOutput = z.infer<typeof VoiceSearchOutputSchema>;

export async function voiceSearch(input: VoiceSearchInput): Promise<VoiceSearchOutput> {
  return voiceSearchFlow(input);
}

const voiceSearchPrompt = ai.definePrompt({
  name: 'voiceSearchPrompt',
  input: {schema: VoiceSearchInputSchema},
  output: {schema: VoiceSearchOutputSchema},
  prompt: `You will receive audio data from a user's voice recording. Your task is to transcribe the recording into text.

Audio Data: {{media url=audioDataUri}}`,
});

const voiceSearchFlow = ai.defineFlow(
  {
    name: 'voiceSearchFlow',
    inputSchema: VoiceSearchInputSchema,
    outputSchema: VoiceSearchOutputSchema,
  },
  async input => {
    const {output} = await voiceSearchPrompt(input);
    return output!;
  }
);
