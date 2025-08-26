import { BedrockAgentCoreClient, InvokeAgentRuntimeCommand } from '@aws-sdk/client-bedrock-agentcore'
import { randomBytes } from 'crypto'

const client = new BedrockAgentCoreClient({
  region: 'us-west-2'
})

const generateSessionId = (): string => {
  return randomBytes(20).toString('hex')
}

const agentRuntimeArn = process.env.AGENT_RUNTIME_ARN
if (!agentRuntimeArn) {
  throw new Error('AGENT_RUNTIME_ARN environment variable is required')
}

const command = new InvokeAgentRuntimeCommand({
  agentRuntimeArn: agentRuntimeArn,
  runtimeSessionId: generateSessionId(),
  payload: JSON.stringify({
    "prompt": "Tell a joke"
  }),
  qualifier: 'DEFAULT'
})

const output = await client.send(command)

if (output.response) {
  const responseBody = await output.response.transformToString()
  const responseData = JSON.parse(responseBody)
  console.log("Agent Response:", responseData)
}
else {
  console.log("No response received from agent runtime")
}
