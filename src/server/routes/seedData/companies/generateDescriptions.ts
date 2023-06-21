import { createClient } from '@supabase/supabase-js'
import { useChatGPT } from '~/composables/useChatGPT'
import { getAllCompanies } from '~/server/api/companies'
import { updateCompany } from '~/server/api/companies/update.post'

export default defineEventHandler(async () => {
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')
  const { sendMessage } = useChatGPT()

  const { companies: allCompanies } = await getAllCompanies({ client, sort: { sort: 'name', ascending: true } }) || []

  for (const company of allCompanies) {
    if (!company.description) {
      const result = await sendMessage(
          `Write description about another company called ${company.name} in 300 characters.`,
      )

      if (result) {
        await updateCompany(client, {
          id: company.id,
          name: company.name,
          description: result,
        })
      }
    }

    if (!company.metaTitle || !company.metaDescription) {
      const prompt = `
        You are an experienced SEO expert tasked with creating engaging blog meta information for a company that is a 
        voucher sharing website, that shares voucher codes for other companies. You are provided with the company name 
        and description. Your goal is to create compelling meta information that will drive 
        traffic to the website and improve the website's search engine rankings, do not write exact amounts 
        or write a percentage or the word Exclusive. 
        You should keep in mind the target audience and the client's goals while crafting 
        the title and description. Do not include any explanations, only provide a RFC8259 compliant JSON response 
        following this format {"title": title, "description": description} without deviation. 
        I will now provide you with the company name and description to based this on:
        
        ${company.name}
        
        ${company.description}
      `

      const result = await sendMessage(
        prompt,
      )

      try {
        const json: {
          title: string
          description: string
        } = result && JSON.parse(result.replace('Answer: ', '"').replace('Response: ', '"'))

        if (json) {
          await updateCompany(client, {
            id: company.id,
            metaTitle: json.title,
            metaDescription: json.description,
          })
        }
      }
      catch (error: any) {
        console.log(error)
      }
    }
  }
})
