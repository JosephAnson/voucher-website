import OpenAI from 'openai'

export function useChatGPT() {
  const openai = new OpenAI({
    organization: 'org-0q9LCI0hhLkxJYyENwjEkfEm',
    apiKey: process.env.OPENAI_API_KEY,
  })

  async function sendMessage(message: string) {
    try {
      const completion = await openai.completions.create({
        model: 'text-davinci-003',
        max_tokens: 1000,
        prompt: message,
      })

      const result = completion.choices[0].text?.replace(/\.\n\n/, '').trim()
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
