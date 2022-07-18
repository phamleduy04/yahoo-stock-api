const { dateToUnix, handleError, handleResponse } = require('../util');
const { request } = require('undici');
const baseURL = 'https://finance.yahoo.com/quote/';
const frequencyList = ['1d', '1wk', '1mo'];
const cheerio = require('cheerio').default;


const getHistoricalPrices = async (startDate, endDate, symbol, frequency) => {
    try {
        if (!startDate || Object.prototype.toString.call(startDate) !== '[object Date]') throw new Error('startDate not provided or not a "Date" type!');
        if (!endDate || Object.prototype.toString.call(startDate) !== '[object Date]') throw new Error('endDate not provided or not a "Date" type!');
        if (!symbol || typeof symbol !== 'string') throw new Error('Symbol not provided or Symbol is not a string!');
        if (!frequency || typeof frequency !== 'string' || !frequencyList.includes(frequency)) throw new Error('Frequency should be "1d", "1wk" or "1mo"');
        const period1 = dateToUnix(startDate);
        const period2 = dateToUnix(endDate) + 86400; // plus 1 day
        const { body } = await request(baseURL + `/${symbol}/history?period1=${period1}&period2=${period2}&interval=${frequency}&filter=history&frequency=${frequency}`);
        const responseBody = await body.text();
        const $ = cheerio.load(responseBody);
        if ($('title').text() == 'Requested symbol wasn\'t found') throw new Error('Symbol not found!');
        const currency = $('#Col1-1-HistoricalDataTable-Proxy > section > div > div > span > span').text().replace('Currency in', '').trim();
        return handleResponse(JSON.parse(responseBody.split('HistoricalPriceStore":{"prices":')[1].split(",\"isPending")[0]), currency);
    }
    catch(err) {
        return handleError(err);
    }
};


module.exports = getHistoricalPrices;