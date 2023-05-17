import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { useScheduler } from '#scheduler'
import { seedCodes } from '~/server/crawlers/codes/seedCodes'
import { seedCompanies } from '~/server/crawlers/companies/seedCompanies'

config()

export default defineNitroPlugin(async () => {
  const scheduler = useScheduler()
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')

  // await seedCompanies()
  // await seedCodes()

  scheduler.run(async () => {
    await seedCodes(client)
  }).everyMinutes(1)

  scheduler.run(async () => {
    await seedCompanies(client)
  }).everyDays(1)
})
