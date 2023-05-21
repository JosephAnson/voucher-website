import { Configuration, OpenAIApi } from 'openai'

export function useChatGPT() {
  const configuration = new Configuration({
    organization: 'org-0q9LCI0hhLkxJYyENwjEkfEm',
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  async function sendMessage(message: string) {
    try {
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 1000,
        prompt: message,
      })

      const result = completion.data.choices[0].text?.replace(/\.\n\n/, '').trim()
      console.log('Response:', result)

      return result
    }
    catch (error: any) {
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
      }
      else {
        console.log(error.message)
      }
    }
  }

  return {
    sendMessage,
  }
}
