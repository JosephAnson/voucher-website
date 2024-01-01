import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import consola from 'consola'
import { useScheduler } from '#scheduler'
import { seedCompanies } from '~/server/seedData/companies/seedCompanies'
import { seedCodes } from '~/server/seedData/codes/seedCodes'
import { deleteOldCodes } from '~/server/seedData/codes/deleteOldCodes'

config()

export default defineNitroPlugin(() => {
  if (process.env.APP_ENV === 'build') {
    consola.log('[server/plugins/scheduler.ts] Skipping scheduler, in build context')
    return
  }

  const scheduler = useScheduler()

  const client = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false, autoRefreshToken: true },
  })

  // await seedCompanies(client)
  // await seedCodes(client)
  // await generateDescriptions(client)
  // await deleteOldCodes(client)

  scheduler.run(async () => {
    await seedCodes(client)
  }).everyDays(1)

  scheduler.run(async () => {
    await seedCompanies(client)
    await deleteOldCodes(client)
  }).everyDays(10)

/*  scheduler.run(async () => {
    await generateDescriptions(client)
  }).yearly() */
})
