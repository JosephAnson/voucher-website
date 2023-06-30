import chromium from '@sparticuz/chromium'
import { createBrowser } from '../utils/createBrowser'
import { convertUrlToId } from '~/utils/convertUrlToId'

// Optional: If you'd like to use the legacy headless mode. "new" is the default.
chromium.setHeadlessMode = true

// Optional: If you'd like to disable webgl, true is the default.
chromium.setGraphicsMode = false

interface Company {
  name: string
  url: string
  imageUrl: string
  id: string
}

export async function getTopParrainCompanies(language = 'en', pageNumber = 0, SITE_URL = 'https://www.topparrain.com') {
  const items: Company[] = []

  const browser = await createBrowser()

  const page = await browser.newPage()

  await page.goto(`${SITE_URL}/${language}/companies?page=${pageNumber}`, { waitUntil: 'networkidle0' })

  const companyLinks = await page.evaluate(() => {
    const items = document.querySelectorAll('.company')

    return Array.from(items).map(item => ({
      name: item.querySelector('.text-gray-700.hover\\:text-gray-800')?.textContent?.trim(),
      href: item.querySelector('a')?.getAttribute('href'),
      imageUrl: item.querySelector('a img')?.getAttribute('src'),
    }))
  })

  for (const companyInfo of companyLinks) {
    await page.goto(SITE_URL + companyInfo.href, { waitUntil: 'networkidle0' })

    let companyUrl = await page.evaluate(() => document.querySelector('a.w-16.h-16')?.getAttribute('href'))

    if (companyUrl) {
      if (!companyUrl.includes('http'))
        companyUrl = `https://${companyUrl}`

      console.log('companyUrl', convertUrlToId(companyUrl))

      if (companyInfo.imageUrl && companyInfo.name) {
        items.push({
          name: companyInfo.name,
          url: companyUrl,
          imageUrl: companyInfo.imageUrl,
          id: convertUrlToId(companyUrl),
        })
      }
    }
  }

  return items
}
