const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
require('../server/db/mongoose');
const { Offer } = require('../server/models/offers');

const scrapeTesla = async () => {
    let dataArray = [];
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1500 });
    await page.setDefaultTimeout(10000000);
    // page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.goto('https://www.leboncoin.fr/recherche/?category=2&text=tesla');
    //await page.goto('https://www.leboncoin.fr/voitures/1603576702.htm/');

    await page.screenshot({ path: 'screenshot.png' });

    await page.waitFor(3000)
    //const ok = await page.$$('a._1f-eo', e=> e);
    let teslas = await page.$$eval('a.clearfix[title~=tesla i]', e => e.map((a) => a.href));
    let pageButtons = await page.$$eval('a._1f-eo', e => e.map((a) => a.href));
    pageButtons = [...new Set(pageButtons)];
    console.log(pageButtons);
    for (let button of pageButtons) {
      await page.goto(button);
      await page.waitFor(2000);
      let list = await page.$$eval('a.clearfix[title~=tesla i]', e => e.map((a) => a.href));
      teslas = teslas.concat(list);
      console.log(list)
    }
    await page.waitFor(2000);
    for (const [i, tesla] of teslas.entries()) {
      let data = {
        images: [],
        title: '',
        price: '',
        pubDate: '',
        criteria: [],
        description: '',
        place: '',
        seller: '',
        tel: '',
      };
      await page.goto(tesla);
      await page.waitFor(1000);
      //    click one time on chevron to get all pictures links
      try {
        await page.click('div.Mw3Xe');
      } catch (e) {
        console.log(e)
      };
      try {
        data.images = await page.$$eval('div._2x8BQ > img', e => e.map((img) => img.src));
        data.title = await page.$eval('h1._246DF._2S4wz', e => e.textContent);
        data.price = await page.$eval('span._1F5u3', e => e.textContent);
        data.pubDate = await page.$eval('div[data-qa-id=adview_date]', e => e.textContent);
        let criteriaNames = await page.$$eval('div._3-hZF', e => e.map((title) => title.textContent));
        let criteriaValues = await page.$$eval('div._3Jxf3', e => e.map((title) => title.textContent));
        for (const [i, criteria] of criteriaNames.entries()) {
          data.criteria.push({ name: criteria, value: criteriaValues[i] })
        };
        data.description = await page.$eval('span.content-CxPmi', e => e.textContent);
        data.place = await page.$eval('div[data-qa-id=adview_location_informations] > span', e => e.textContent);
        try {
        data.seller = await page.$eval('div._2rGU1', e => e.textContent);
        console.log(data.seller, 'first');
        } catch (e1) {
          try {
          data.seller = await page.$eval('span._2j7r2', e => e.textContent);
          console.log(data.seller, 'second');
          } catch (e2) {
            data.seller = await page.$eval('.T5Lvz', e => e.textContent);
            console.log(e2);
          }
          console.log(e1, 'error in first');
        }
      } catch (e) {
        console.log(e)
      };
      try {
        await page.$eval('button._2sNbI.ObuDQ.GXQkc._2xk2l', elem => elem.click());
        // await page.click('div[data-reactid=336]');
        await page.waitFor(1000);
        data.tel = await page.$eval('a._2sNbI.ObuDQ.GXQkc._2BP2c', e => e.textContent);
        console.log('yoooooooo');
      } catch (e) {
        data.tel = 'Not Found';
        console.log(e, 'what');
      };
      console.log(data);
      dataArray.push(data);
    }

    console.log('final array', dataArray);
    await browser.close()
    await Offer.collection.drop();
  } catch (error) {
    console.log(error);
    // return scrapedData
  } finally {
    Offer.collection.insert(dataArray, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
  }
 // var check = new Offer(teslas);
 // await check.save();
/*   await Offer.collection.drop();
  Offer.collection.insert(dataArray, function (err, docs) {
    if (err){ 
        return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  }); */
}

scrapeTesla();