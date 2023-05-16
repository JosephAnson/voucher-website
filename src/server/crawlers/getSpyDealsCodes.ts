import type { Page } from 'puppeteer'
import type { Code } from '~/types'

export async function getSpyDealsCodes(page: Page, name: string, language = 'en', SITE_URL = 'https://www.spydeals.co.uk/shops'): Promise<(Code | null)[]> {
  await page.goto(SITE_URL)

  const items = await page.evaluate(() => {
    const items = document.querySelectorAll('.companies-alphabetized__company-item a')
    return Array.from(items).map(item => ({
      text: item?.textContent?.trim().toLowerCase(),
      href: item?.getAttribute('href'),
    }))
  })

  async function getCompanyUrl(page: Page, name: string) {
    const item = items.find(({ text }) => text?.includes(name.toLowerCase()))

    return item?.href || null
  }

  const companyUrl = await getCompanyUrl(page, name)

  if (companyUrl) {
    await page.goto(`${companyUrl}`)

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
        await page.setCookie({ name: 'show-voucher', value: voucher.voucherId })

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
