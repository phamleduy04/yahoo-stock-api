const yahooStockAPI = require('../index.js');
async function main() {
    console.log(await yahooStockAPI.getSymbol('AAPL'));
    const startDate = new Date('08/21/2020');
    const endDate = new Date('08/26/2020');
    console.log(await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'AAPL', '1d'));
}

main();