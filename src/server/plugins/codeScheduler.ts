import { createClient as createSupabaseClient } from '@supabase/supabase-js'
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
  if (process.env.APP_ENV === 'build')
    consola.log('[server/plugins/scheduler.ts] Skipping scheduler, in build context')

  startScheduler()
})

function createClient() {
  // eslint-disable-next-line node/prefer-global/process
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
