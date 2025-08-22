import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const POST = async (request: Request) => {
  const { prompt }: { prompt?: string } = await request.json()

  if (!prompt) {
    return new Response('Prompt is required', { status: 400 })
  }

  const result = await generateText({
    model: openai('gpt-4.1'),
    prompt,
  })

  return Response.json({
    steps: result.steps,
    finalAnswer: result.text,
  })
}
