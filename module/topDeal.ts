import cron from 'node-cron';
import puppeteer from 'puppeteer';

// Array that stocks hottest deals
let topDeals: { title: string; url: string; img: string; upvote: string; price: string; }[] = [];
interface dataJson{
  "information": string,
  "data": any
}

(async () => {
  try {

    cron.schedule('58 19 * * *', async () => {

      // Préparation de puppeteer
      const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox']
      });

      // Lancement de dealabs
      const page = await browser.newPage();
      const URL = "https://www.dealabs.com";
      await page.goto(URL, { waitUntil: "networkidle0" });

      // Allow cookies
      await page.click(
        "button.flex--grow-1.flex--fromW3-grow-0.width--fromW3-ctrl-m.space--b-2.space--fromW3-b-0"
      );

      // Récupération de nos données pour notre bot
      setTimeout(async () => {

        // Récupère les div en carousel
        const options = await page.$$("div.flex.flex--grow-1");

        // Le carousel qui nous intéresse
        const deals = options[1];

        // Liste des attributs qui nous intéresse
        const titles = await deals.$$("a[title]");

        // Lien vers le deals
        const hrefs = await deals.$$("a[href]");


        topDeals.length = 0;

        for (let index = 0; index < 5; index++) {
          // Title to string
          const titleDealString = await page.evaluate(
            (title) => title.getAttribute("title"),
            titles[index]
          );

          // Link into string
          const hrefDealString = await page.evaluate(
            (href) => href.getAttribute("href"),
            hrefs[index]
          );

          // Image of deal
          const imgs = await titles[index].$("img[src]");
          const imgDealURL = await page.evaluate(
            (img) => img.getAttribute("src"),
            imgs
          );

          // Value
          const upvoteTag = await titles[index].$('strong');
          const upvote = await page.evaluate(tag => tag.textContent, upvoteTag);

          // Price or reduction
          const priceTag = await titles[index].$('span.text--overlay');
          let price = '';
          if (priceTag != null) {
            price = await page.evaluate(tag => tag.textContent, priceTag);

            if(price === 'GRATUIT'){
              price = 'FREE'
            }
          } else {
            price = 'FREE';
          }
          
          topDeals.push({
            title: titleDealString,
            url: URL + hrefDealString,
            img: imgDealURL,
            upvote: upvote,
            price: price
          });
        }
        console.log(new Date().toLocaleString() + " : "+ topDeals.length +" elements for Dealabs.topDeals")
        await browser.close();
      }, 2000);
    });
  } catch (error) {
    (new Date().toLocaleString() + ' ' + error);
    throw error;
  }
})();

export default { topDeals };