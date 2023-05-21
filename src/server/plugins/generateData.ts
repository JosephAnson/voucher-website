import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { useScheduler } from '#scheduler'
import { seedCodes } from '~/server/seedData/codes/seedCodes'
import { seedCompanies } from '~/server/seedData/companies/seedCompanies'
import { generateDescriptions } from '~/server/seedData/companies/generateDescriptions'

config()

export default defineNitroPlugin(async () => {
  const scheduler = useScheduler()
  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')

  // await seedCompanies(client)
  // await seedCodes(client)
  // await generateDescriptions(client)

  scheduler.run(async () => {
    await seedCodes(client)
  }).everyDays(1)

  scheduler.run(async () => {
    await seedCompanies(client)
  }).everyDays(10)

  scheduler.run(async () => {
    await generateDescriptions(client)
  }).yearly()
})
