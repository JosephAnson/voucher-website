import type { SupabaseClient } from '@supabase/supabase-js'
import { useChatGPT } from '~/composables/useChatGPT'
import type { Database } from '~/supabase.types'
import { getAllCompanies } from '~/server/api/companies'
import { updateCompany } from '~/server/api/companies/update.post'

export async function generateDescriptions(client: SupabaseClient<Database>) {
  const { sendMessage } = useChatGPT()

  const allCompanies = await getAllCompanies(client, { sort: 'name', ascending: true }) || []

  for (const company of allCompanies) {
    if (!company.description) {
      const result = await sendMessage(
          `Write description about another company called ${company.name} in 300 characters. Explain that you can find a list of discount codes on the our page they're already viewing, that others have shared`,
      )

      if (result) {
        await updateCompany(client, {
          id: company.id,
          name: company.name,
          description: result,
        })
      }
    }
  }
}
