import { generateText } from 'ai'
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'

const bedrock = createAmazonBedrock({
  region: 'us-west-2',
  credentialProvider: fromNodeProviderChain(),
})

const model = bedrock('us.amazon.nova-lite-v1:0')

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
