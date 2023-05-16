import type { Page } from 'puppeteer'
import type { Code } from '~/types'

export async function getTopParrainCodes(page: Page, name: string, language = 'en', SITE_URL = 'https://www.topparrain.com'): Promise<Code[]> {
  async function getCompanyUrl(page: Page, name: string) {
    await page.goto(`${SITE_URL}/${language}/companies?search%5Bname%5D=${name}`)

    return page.evaluate(() => {
      const firstLink = document.querySelectorAll('.company a')?.[0]
      return firstLink?.getAttribute('href') || null
    })
  }

  const companyUrl = await getCompanyUrl(page, name)

  if (companyUrl) {
    await page.goto(`${SITE_URL}${companyUrl}?show_codes=true`)

    const items = await page.evaluate(() => {
      const codeItemsSelector = '.referral-code'
      const codeSelector = '.my-1.w-full.break-words'
      const titleSelector = '.text-gray-700.font-semibold'
      const descriptionSelector = '.text-gray-600.font-light'

      const items = document.querySelectorAll(codeItemsSelector)

      return Array.from(items).map((item) => {
        const code = item.querySelector(codeSelector)?.textContent?.trim()
        const title = item.querySelector(titleSelector)?.textContent?.trim()
        const description = item.querySelector(descriptionSelector)?.textContent?.trim()

        if (!code || !title || !description)
          return null

        return {
          code,
          title,
          description,
        }
      })
    })

    return items.filter(Boolean).map(item => ({ ...item, language })) as Code[]
  }

  return []
}
