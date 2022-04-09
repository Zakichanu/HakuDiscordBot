import cron from 'node-cron';
import request from 'request';

// Array stockant les bons plans
let topDeals: { title: string; url: string; img: string; upvote: string; price: string;  }[] = [];
interface dataJson{
  "information": string,
  "data": any
}

(async () => {
  try {

    cron.schedule('0 58 19 * * *', async () => {

      var options = {
        'method': 'GET',
        'url': 'https://pepper.api.zakichanu.com/dealabs/topDeals',
        'headers': {
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);{
          let responseJson: dataJson = JSON.parse(response.body)

          if(responseJson.information === "DEALS FOUND"){
            responseJson.data.forEach((item: any) => {
              topDeals.push({
                title: item.title,
                url: item.url,
                img: item.img,
                price: item.price,
                upvote: item.upvote,
              })
            });
          }else{
            console.log(responseJson.information)
          }
        }
        
      });
    });

    



  } catch (error) {
    (new Date().toLocaleString() + ' ' + error);
    throw error;
  }
})();

export default { topDeals };