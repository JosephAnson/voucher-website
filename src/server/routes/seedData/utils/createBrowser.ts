import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import { LOCAL_CHROME_EXECUTABLE } from '../utils/constants'

export async function createBrowser() {
  const executablePath = process.env.IS_LOCAL ? LOCAL_CHROME_EXECUTABLE : await chromium.executablePath()
  return await puppeteer.launch({
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    args: chromium.args,
    ignoreHTTPSErrors: true,
  })
}
