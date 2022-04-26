import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { getPropertyInfo, Property } from './getPropertyInfo';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getUR(): Promise<Property[]> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(
      'https://www.ur-net.go.jp/chintai/kanto/tokyo/result/?area=01&skcs=102&skcs=104&area=02&skcs=107&skcs=108&skcs=121&skcs=122&skcs=123&area=03&skcs=109&skcs=111&skcs=112&area=04&skcs=120&skcs=115&area=05&skcs=117&skcs=119&skcs=209&skcs=229&skcs=214&skcs=221&skcs=222&area=01&skcs=102&skcs=104&area=02&skcs=107&skcs=108&skcs=121&skcs=122&skcs=123&area=03&skcs=109&skcs=111&skcs=112&area=04&skcs=120&skcs=115&area=05&skcs=117&skcs=119&skcs=209&skcs=229&skcs=214&skcs=221&skcs=222&rent_low=&rent_high=&rent_low=&rent_high=&walk=15&bus=1&walk=15&bus=1&room=3DK&room=3LDK&room=3DK&room=3LDK&floorspace_low=&floorspace_high=&floorspace_low=&floorspace_high=&years=&years=&floor=2&floor=2&facility_internet=2&facility_internet=2&facility_internet=2&tdfk=13&todofuken=tokyo',
    );
    await page.waitForTimeout(5000);
    await page.screenshot({ fullPage: true, path: './img.png' });
    const searchResults = await page.$$('.module_searchs_property');
    const noEmptySearchResults = await Promise.all(
      [...searchResults]
        .filter(async (result) => {
          const el = await result.$('strong.rep_bukken-count-room');
          const numberOfVacancies = Number(
            await el?.getProperty('textContent'),
          );
          return numberOfVacancies > 0;
        })
        .map(getPropertyInfo),
    );
    console.log(noEmptySearchResults);
    await browser.close();
    return noEmptySearchResults;
  }
}
