import YahooStockAPI from "..";

const yahoo = new YahooStockAPI();

const startDate = new Date('08/21/2020');
const endDate = new Date('08/26/2020');

yahoo.getSymbol({ symbol: "AAPL" }).then(console.log);
yahoo.getHistoricalPrices({ startDate, endDate, symbol: 'AAPL', frequency: '1d' }).then(console.log);