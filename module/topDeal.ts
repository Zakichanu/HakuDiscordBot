import cron from 'node-cron';
import request from 'request';

// Array stockant les bons plans
let topDeals: { title: string; url: string; img: string; upvote: string; price: string; }[] = [];

(async () => {
  try {

    cron.schedule('0 58 19 * * *', async () => {

      var options = {
        'method': 'GET',
        'url': 'https://api.dealabs.zakichanu.com/topDeals',
        'headers': {
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);{
          JSON.parse(response.body).forEach((item: any) => {
            topDeals.push({
              title: item.title,
              url: item.url,
              img: item.img,
              price: item.price,
              upvote: item.upvote,
            })
        });
        }
        
      });
    });

    



  } catch (error) {
    (new Date().toLocaleString() + ' ' + error);
    throw error;
  }
})();

export default { topDeals };