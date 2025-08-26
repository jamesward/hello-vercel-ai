import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

const model = google('gemini-2.5-flash')

export const POST = async (request: Request) => {
  const reqBody: any = await request.json()
  const prompt: string = reqBody.prompt

  if (!prompt) {
    return new Response('Prompt is required', { status: 400 })
  }

  const result = await generateText({
    model: model,
    prompt: prompt,
  })

  return Response.json({
    steps: result.steps,
    finalAnswer: result.text,
  })
}
