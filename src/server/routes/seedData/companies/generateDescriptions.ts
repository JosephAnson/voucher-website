import { createClient } from '@supabase/supabase-js'
import { useChatGPT } from '~/composables/useChatGPT'
import { getAllCompanies } from '~/server/routes/seedData/service/getAllCompanies'

export default defineEventHandler(async () => {
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')
  const { sendMessage } = useChatGPT()

  const { data: allCompanies } = await getAllCompanies(client)

  if (allCompanies) {
    for (const company of allCompanies) {
      if (!company.description) {
        const result = await sendMessage(
          `Write description about another company called ${company.name} in 300 characters.`,
        )

        if (result) {
          const { error } = await client
            .from('companies')
            .update({
              name: company.name, description: company.description,
            })
            .eq('id', company.id)
            .select()
            .single()

          if (error)
            console.log(`Cannot update company: ${error.message}`)
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
            const { error } = await client
              .from('companies')
              .update({
                metaTitle: json.title, metaDescription: json.description,
              })
              .eq('id', company.id)
              .select()
              .single()

            if (error)
              console.log(`Cannot update company: ${error.message}`)
          }
        }
        catch (error: any) {
          console.log(error)
        }
      }
    }
  }

  return 'Generating Descriptions'
})
