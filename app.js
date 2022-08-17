require('dotenv').config()
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY // add API_KEY here
const finnhubClient = new finnhub.DefaultApi()

const getPrice = (stock) => {
        const currentTime = Math.round(new Date().getTime() / 1000);
        finnhubClient.stockCandles(stock, "D" , currentTime-60, currentTime, (error, data, response) => {
            console.log(data.c) 
    });
}

const getPrices = (stocks) => {
    stocks.map( (stock, i) => {
        setTimeout( () => {
            getPrice(stock)
          }, 1000/29.5 * i) // limit : 30 req/sec
        }
    )
}

getPrices(["AAPL", "NFLX", "GOOGL"])
