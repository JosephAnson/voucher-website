import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import consola from 'consola'
import { useScheduler } from '#scheduler'
import { seedCompanies } from '~/server/seedData/companies/seedCompanies'
import { seedCodes } from '~/server/seedData/codes/seedCodes'
import { deleteOldCodes } from '~/server/seedData/codes/deleteOldCodes'
import type { Database } from '~/supabase.types'

config()

export default defineNitroPlugin(() => {
  // eslint-disable-next-line node/prefer-global/process
  if (process.env.APP_ENV === 'build') {
    consola.log('[server/plugins/scheduler.ts] Skipping scheduler, in build context')
    return
  }

  const scheduler = useScheduler()

  const client = createClient<Database>(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false, autoRefreshToken: true },
  })

  scheduler.run(async () => {
    await seedCodes(client)
  }).everyDays(1)

  scheduler.run(async () => {
    await seedCompanies(client)
  }).everyDays(10)

  scheduler.run(async () => {
    await deleteOldCodes(client)
  }).everyDays(10)

  /*  scheduler.run(async () => {
    await generateDescriptions(client)
  }).yearly() */
})
