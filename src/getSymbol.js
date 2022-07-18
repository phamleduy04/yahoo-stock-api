const { request } = require('undici');
const baseURL = 'https://finance.yahoo.com/quote/';
const camelCase = require('camelcase');
const cheerio = require('cheerio').default;
const { handleError, handleResponse } = require('../util');
const numeral = require('numeral');
numeral.register('locale', 'api', require('../numeralConfig.json'));
numeral.locale('api');

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

const getSymbol = async (symbol) => {
    try {
        if (!symbol || typeof symbol !== 'string') throw new Error('Symbol not provided or Symbol is not a string!');
        const response = await request(baseURL + `${symbol}/`);
        const $ = cheerio.load(await response.body.text());
        if ($('title').text() === "Requested symbol wasn't found") return { error: true, message: 'Symbol not found!', response: null };
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

module.exports = getSymbol;