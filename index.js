const cheerio = require('cheerio').default;
const { dateToUnix, handleError, handleResponse } = require('./util');
const frequencyList = ['1d', '1wk', '1mo'];
var numeral = require('numeral');
numeral.register('locale', 'dui', require('./numeralConfig.json')); // dui is my nickname, just for custom config xD
numeral.locale('dui');
const { request } = require('undici');
const baseURL = 'https://finance.yahoo.com/quote/';
const camelCase = require('camelcase');

const mapRows = (_, row) => {
    const json = {};
    const skipCheckColumn = ['earningsDate', 'exDividendDate', 'bid', 'ask'];
    cheerio(row).children('tr').each((_, cell) => {
        cell = cheerio.load(cell.childNodes);
        const column = cell('td:nth-child(1)').text().replace('1y', 'oneYear').replace('52', 'fiftyTwo').replace(/\([^)]*\)|'s|&/g, '');
        let value = cell('td:nth-child(2)').text() !== 'N/A' ? cell('td:nth-child(2)').text() : null;
        json[camelCase(column)] = numeral(value).value() == null || isNaN(numeral(value).value()) || skipCheckColumn.includes(camelCase(column)) ? value : numeral(value).value();
    })
    return json;
}


module.exports = {
    getHistoricalPrices: async (startDate, endDate, symbol, frequency) => {
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
    },
    getSymbol: async (symbol) => {
        try {
            if (!symbol || typeof symbol !== 'string') throw new Error('Symbol not provided or Symbol is not a string!');
            const { body } = await request(baseURL + `${symbol}/`);
            const $ = cheerio.load(await body.text());
            let currency = $('#quote-header-info > div.Mt\\(15px\\) > div > div > span').text()
            currency = currency ? currency.split(' ').pop() : undefined;
            const col1 = $('#quote-summary > div.Pend\\(12px\\) > table > tbody').map(mapRows).get()[0];
            const col2 = $('#quote-summary > div.Pstart\\(12px\\) > table > tbody').map(mapRows).get()[0];
            return handleResponse({ updated: Date.now(), ...col1, ...col2 }, currency);
            
        }
        catch(err) {
            return handleError(err);
        }
    }
}

