import { createClient } from '@supabase/supabase-js'
import { getAllCompanies } from '../service/getAllCompanies'
import { chunkArray } from '~/server/utils/chunkArray'

const KEY = 'seedDataSeedCodesChunkNumber'

export default defineEventHandler(async () => {
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false, autoRefreshToken: true },
  })

  const dataStorage = useStorage('data')
  const { data: allCompanies } = await getAllCompanies(client)

  let chunkNumber = await dataStorage.getItem<number>(KEY) || 0

  if (chunkNumber !== null) {
    if (allCompanies) {
      const companyChunks = chunkArray(allCompanies, 5)

      if (chunkNumber >= companyChunks.length)
        chunkNumber = 0

      console.log(`Seed cods chunkNumber ${chunkNumber} running`)

      for (const company of companyChunks[chunkNumber]) {
        $fetch('/seedData/codes/seedCode', {
          method: 'POST',
          body: company,
        })
      }

      await dataStorage.setItem(KEY, chunkNumber + 1)
    }

    return 'Seeding codes'
  }
  else {
    return 'Error accessing chunk number'
  }
})
