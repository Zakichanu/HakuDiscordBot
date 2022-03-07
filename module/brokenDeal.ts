import cron from 'node-cron';
import request from 'request';

// Array stockant les bons plans
let brokenDeals: {
  title: string; url: string; img: string; upvote: string; price: string; username: string;
  insertedTime: string, expiredTime: string;
}[] = [];
interface dataJson{
  "information": string,
  "data": any
}

(async () => {
  try {

    cron.schedule('15 * * * * *', async () => {

      var options = {
        'method': 'GET',
        'url': 'https://api.dealabs.zakichanu.com/brokenDeals',
        'headers': {
        }
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);{
          let responseJson: dataJson = JSON.parse(response.body)

          if(responseJson.information === "DEALS FOUND"){
            responseJson.data.forEach((item: any) => {
              brokenDeals.push({
                title: item.title,
                img: item.img,
                expiredTime: item.expiredTime,
                insertedTime: item.insertedTime,
                price: item.price,
                upvote: item.upvote,
                url: item.url,
                username: item.username
              })
            });
          }
        }
        
      });
    });

    



  } catch (error) {
    (new Date().toLocaleString() + ' ' + error);
    throw error;
  }
})();
 
export default { brokenDeals };
