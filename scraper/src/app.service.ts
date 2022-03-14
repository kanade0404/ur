import { Injectable } from '@nestjs/common';
import puppeteer from "puppeteer"

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getUR(): Promise<string> {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
    const page = await browser.newPage()
    await page.goto("https://www.ur-net.go.jp/chintai/")
    await page.waitForTimeout(5000)
    const url =  page.url()
    await browser.close()
    return url
  }
}
