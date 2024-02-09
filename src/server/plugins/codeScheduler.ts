import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { useScheduler } from '#scheduler'
import { seedCompanies } from '~/server/seedData/companies/seedCompanies'
import { seedCodes } from '~/server/seedData/codes/seedCodes'
import { deleteOldCodes } from '~/server/seedData/codes/deleteOldCodes'
import type { Database } from '~/supabase.types'

config()

export default defineNitroPlugin(() => {
  if (process.env.APP_ENV === 'build') {
    console.log('[server/plugins/scheduler.ts] Skipping scheduler, in build context')
    return
  }

  startScheduler()
})

function createClient() {
  return createSupabaseClient<Database>(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
    auth: { persistSession: false, autoRefreshToken: true },
  })
}

function startScheduler() {
  const scheduler = useScheduler()

  scheduler.run(async () => {
    const client = createClient()
    await seedCodes(client)
  }).everyDays(1)

  scheduler.run(async () => {
    const client = createClient()
    await seedCompanies(client)
  }).everyDays(10)

  scheduler.run(async () => {
    const client = createClient()
    await deleteOldCodes(client)
  }).everyDays(10)

  /*  scheduler.run(async () => {
   await generateDescriptions(client)
 }).yearly() */
}
