import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { chromium } from 'playwright'
import { useScheduler } from '#scheduler'
import { seedCompanies } from '~/server/seedData/companies/seedCompanies'
import { seedCodes } from '~/server/seedData/codes/seedCodes'
import { deleteOldCodes } from '~/server/seedData/codes/deleteOldCodes'
import type { Database } from '~/supabase.types'

config()

const client = createSupabaseClient<Database>(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '', {
  auth: { persistSession: false, autoRefreshToken: true },
})

export default defineNitroPlugin(() => {
  const scheduler = useScheduler()

  scheduler.run(async () => {
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    try {
      await seedCodes(context, client)
    }
    catch (e) {
      console.error(e)
    }
    finally {
      await context.close()
      await browser.close()
    }
  }).everyDays(1)

  scheduler.run(async () => {
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    try {
      await seedCompanies(context, client)
    }
    catch (e) {
      console.error(e)
    }
    finally {
      await context.close()
      await browser.close()
    }
  }).everyDays(10)

  scheduler.run(async () => {
    await deleteOldCodes(client)
  }).everyDays(10)

  /*  scheduler.run(async () => {
   await generateDescriptions(client)
 }).yearly() */
})
