import { launchChromium } from 'playwright-aws-lambda'
import { convertUrlToId } from '~/utils/convertUrlToId'

interface Company {
  name: string
  url: string
  imageUrl: string
  id: string
}

export async function getTopParrainCompanies(language = 'en', pageNumber = 0, SITE_URL = 'https://www.topparrain.com') {
  const items: Company[] = []
  const browser = await launchChromium({ headless: true })

  const page = await browser.newPage()

  await page.goto(`${SITE_URL}/${language}/companies?page=${pageNumber}`)

  const companyLinks = await page.evaluate(() => {
    const items = document.querySelectorAll('.company')

    return Array.from(items).map(item => ({
      name: item.querySelector('.text-gray-700.hover\\:text-gray-800')?.textContent?.trim(),
      href: item.querySelector('a')?.getAttribute('href'),
      imageUrl: item.querySelector('a img')?.getAttribute('src'),
    }))
  })

  for (const companyInfo of companyLinks) {
    await page.goto(SITE_URL + companyInfo.href)

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

  await page.close()

  await browser.close()

  return items
}
