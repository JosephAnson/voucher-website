import type { BrowserContext, Page } from 'playwright'
import type { Code } from '~/types'

const companiesMap: Record<string, { text?: string, href: string | null }> = {}
let initialSearch = false

export async function getSpyDealsCodes(context: BrowserContext, page: Page, name: string, language = 'en', SITE_URL = 'https://www.spydeals.co.uk/shops'): Promise<(Code | null)[]> {
  if (!initialSearch) {
    const sections = ['/a-d', '/e-g', '/h-k', '/l-o', '/p-s', '/t-w', '/x-z', '/0-9']

    for (const section of sections) {
      await page.goto(SITE_URL + section)
      await page.waitForLoadState('load') // Wait for the "load" event

      const companies = await page.evaluate(() => {
        const items = document.querySelectorAll('.companies-alphabetized__company-item a')
        return Array.from(items).map(item => ({
          text: item?.textContent?.trim().toLowerCase(),
          href: item?.getAttribute('href'),
        }))
      })

      if (companies) {
        for (const company of companies) {
          if (company.text)
            companiesMap[company.text] = company
        }
      }
    }

    initialSearch = true
  }

  async function getCompanyUrl(page: Page, name: string) {
    const item = Object.values(companiesMap).find(({ text }) => text?.includes(name.toLowerCase()))

    return item?.href || null
  }

  const companyUrl = await getCompanyUrl(page, name)

  if (companyUrl) {
    await page.goto(`${companyUrl}`)
    await page.waitForLoadState('load') // Wait for the "load" event

    const vouchers = await page.evaluate(() => {
      const items = document.querySelectorAll(':not(.expired).company-card.voucher')

      return Array.from(items).map((item) => {
        const link = item.querySelector('a')
        const voucherId = link?.getAttribute('data-show-voucher')
        const href = link?.getAttribute('href')

        return {
          voucherId,
          href,
        }
      })
    })

    const codes: Code[] = []

    for (const voucher of vouchers) {
      if (voucher.href && voucher.voucherId) {
        await context.addCookies([{ name: 'show-voucher', value: voucher.voucherId, url: SITE_URL }])

        await page.goto(`${companyUrl}`)

        const code = await page.evaluate(() => {
          const code = document.querySelector('.copy-voucher-btn.copy-voucher-code')
          const card = code?.closest('.company-card.voucher')
          const title = card?.querySelector('.content-col h3')
          const description = card?.querySelector('.collapse')

          return {
            code: code?.textContent?.trim() || '',
            title: title?.textContent || '',
            description: description?.textContent || '',
          }
        })

        codes.push({ ...code, language })
      }
    }

    return codes
  }

  return []
}
