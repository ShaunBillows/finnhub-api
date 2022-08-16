require('dotenv').config()
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY // <== add API_KEY env var
const finnhubClient = new finnhub.DefaultApi()

const getPrice = (stock) => {
        const currentTime = Math.round(new Date().getTime() / 1000);
        finnhubClient.stockCandles(stock,"D" , currentTime-60, currentTime, (error, data, response) => {
            console.log(data.c) 
    });
}

const getPrices = (stocks) => {
    stocks.map( (stock, i) => {
        setTimeout(function() {
            getPrice(stock)
          }, 1000/31 * i)
        }
    )
}

getPrices(["AAPL", "NFLX", "GOOGL"])