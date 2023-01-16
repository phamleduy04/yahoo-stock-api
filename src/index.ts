/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Pool } from 'undici';
import camelCase from 'camelcase';
import * as cheerio from 'cheerio';
import numeral from 'numeral';
import { dateToUnix, convertMarketCap } from './utils';

import type { HistoricalPricesOptions, HistoricalPricesResponse } from './types/historicalPrices';
import type { getSymbolResponse, col1Response, col2Response } from './types/getSymbol';

class YahooStockAPI {
    private frequencyList = ['1d', '1wk', '1mo'];
    private requestPool = new Pool('https://finance.yahoo.com');

    public async getHistoricalPrices({ startDate, endDate, symbol, frequency }: HistoricalPricesOptions): Promise<APIresponse> {
        try {
            if (!startDate || Object.prototype.toString.call(startDate) !== '[object Date]') throw new Error('startDate not provided or not a "Date" type!');
            if (!endDate || Object.prototype.toString.call(startDate) !== '[object Date]') throw new Error('endDate not provided or not a "Date" type!');
            if (!symbol || typeof symbol !== 'string') throw new Error('Symbol not provided or Symbol is not a string!');
            if (!frequency || typeof frequency !== 'string' || !this.frequencyList.includes(frequency)) throw new Error('Frequency should be "1d", "1wk" or "1mo"');
            const period1 = dateToUnix(startDate);
            // pluis 1 day
            const period2 = dateToUnix(endDate) + 86400;
            const request = await this.requestPool.request({
                method: 'GET',
                path: `/quote/${symbol}/history?period1=${period1}&period2=${period2}&interval=${frequency}&filter=history&frequency=${frequency}&includeAdjustedClose=true`,
            });
            const responseBody = await request.body.text();
            const $ = cheerio.load(responseBody);
            if ($('title').text() == 'Requested symbol wasn\'t found') throw new Error('Symbol not found!');
            let currency: string | undefined = $('#quote-header-info > div:nth-child(2) > div > div > span').text();
            currency = currency ? currency.split('.')[1].replace('Currency in', '').trim() : undefined;
            let name: string | undefined = $('h1').text();
            const regex = /^[^(]*/;
            name = regex.exec(name)[0].substring(0, name.length - 2);
            const response = $('#Col1-1-HistoricalDataTable-Proxy > section > div:nth-child(2) > table > tbody > tr').map(this.getHistoricalPricesMapRows).get();
            return {
                error: false,
                currency: currency || undefined,
                name: name || undefined,
                response,
            };
        }
        catch(err) {
            return this.handleError(err);
        }
    }

    public async getSymbol({ symbol }: { symbol: string }): Promise<APIresponse> {
        try {
            if (!symbol || typeof symbol !== 'string') throw new Error('Symbol not provided or Symbol is not a string!');
            const request = await this.requestPool.request({
                method: 'GET',
                path: `/quote/${symbol}/`,
            });
            const responseBody = await request.body.text();
            const $ = cheerio.load(responseBody);
            let currency: string | undefined = $('#quote-header-info > div:nth-child(2) > div > div > span').text();
            let name: string | undefined = $('h1').text();
            const regex = /^[^(]*/;
            name = regex.exec(name)[0].substring(0, name.length - 2);
            currency = currency ? currency.split('.')[1].replace('Currency in', '').trim() : undefined;
            // @ts-ignore
            const col1:col1 = $('#quote-summary > div.Pend\\(12px\\) > table > tbody').map(this.getSymbolMapRows).get()[0];
            // @ts-ignore
            const col2:col2 = $('#quote-summary > div.Pstart\\(12px\\) > table > tbody').map(this.getSymbolMapRows).get()[0];
            return this.handleResponse({ updated: Date.now(), ...this.parseCol1(col1), ...this.parseCol2(col2) }, currency, name);
        }
        catch(err) {
            return this.handleError(err);
        }
    }

    private getHistoricalPricesMapRows(_, row): HistoricalPricesResponse {
        const obj = { date: null, open: null, high: null, low: null, close: null, adjClose: null, volume: null };
        const columns = ['date', 'open', 'high', 'low', 'close', 'adjClose', 'volume'];
        cheerio.load(row)('td').map((index, cell: any) => {
            cell = cheerio.load(cell);
            const selector = columns[index];
            switch(index) {
                case 0:
                    obj[selector] = new Date(cell.text()).getTime() / 1000;
                    break;
                default:
                    obj[selector] = numeral(cell.text()).value();
                    break;
            }
        });
        return obj;
    }

    private getSymbolMapRows(_ : any, row: any) {
        const json = {};
        const skipCheckColumn = ['marketCap', 'earningsDate', 'exDividendDate', 'bid', 'ask'];
        // eslint-disable-next-line no-shadow
        cheerio.load(row)('tr').each((_, cell: any) => {
            cell = cheerio.load(cell);
            const column: string = cell('td:nth-child(1)').text().replace('1y', 'oneYear').replace('52', 'fiftyTwo').replace(/\([^)]*\)|'s|&/g, '');
            const value = cell('td:nth-child(2)').text() !== 'N/A' ? cell('td:nth-child(2)').text() : null;
            // @ts-ignore
            json[camelCase(column)] = numeral(value).value() == null || isNaN(numeral(value).value()) || skipCheckColumn.includes(camelCase(column)) ? value : numeral(value).value();
        });
        return json;
    }

    private handleError(error: unknown): ErrorResponse {
        return {
            error: true,
            message: error instanceof Error ? error.message : error,
        };
    }

    private handleResponse(response: HistoricalPricesResponse[] | getSymbolResponse, currency: string | undefined, name: string | undefined): SuccessResponse {
        if (!response) throw new Error('Response if not provided');
        return {
            error: false,
            currency: currency || undefined,
            name: name || undefined,
            response,
        };
    }

    private parseCol1(Column1: col1) : col1Response {
        const json: col1Response = {
            previousClose: 0,
            open: 0,
            bid: {
                value: 0,
                shares: 0,
            },
            ask: {
                value: 0,
                shares: 0,
            },
            dayRange: {
                low: 0,
                high: 0,
            },
            fiftyTwoWeekRange: {
                low: 0,
                high: 0,
            },
            volume: 0,
            avgVolume: 0,
        };
        Object.entries(Column1).forEach(([k, v], index) => {
            switch (index) {
                case 2:
                case 3: {
                    const [value, shares] = v.toString().split('x').map((val: string) => numeral(val.trim()).value());
                    // @ts-ignore
                    json[k]['value'] = value;
                    // @ts-ignore
                    json[k]['shares'] = shares;
                    break;
                }
                case 4:
                case 5: {
                    const [low, high] = v.toString().split('-').map((val: string) => numeral(val.trim()).value());
                    // @ts-ignore
                    json[k]['low'] = low;
                    // @ts-ignore
                    json[k]['high'] = high;
                    break;
                }
                default: {
                    // @ts-ignore
                    json[k] = numeral(v).value();
                }
            }
        });
        return json;
    }

    private parseCol2(Column2: col2): col2Response {
        const json: col2Response = {
            marketCap: 0,
            beta: 0,
            peRatio: 0,
            eps: 0,
            earningsDate: {
                start: 0,
                end: 0,
            },
            forwardDividend: 0,
            forwardYield: 0,
            exDividendDate: 0,
            oneYearTargetEst: 0,
        };
        Object.entries(Column2).forEach(([k, v], index) => {
            switch (index) {
                case 0: {
                    // @ts-ignore
                    json.marketCap = convertMarketCap(v);
                    break;
                }
                case 4: {
                    const [start, end] = v.toString().split('-').map((val: string) => dateToUnix(val.trim()));
                    // @ts-ignore
                    json[k]['start'] = start;
                    // @ts-ignore
                    json[k]['end'] = end;
                    break;
                }
                case 5: {
                    const [fdividend, fyield] = v.toString().split(' ').map((val: string) => numeral(val.trim().replace('(', '').replace(')', '').replace('%', '')).value());
                    // @ts-ignore
                    json.forwardDividend = fdividend;
                    // @ts-ignore
                    json.forwardYield = fyield;
                    break;
                }
                case 6:
                    // @ts-ignore
                    json[k] = dateToUnix(v);
                    break;
                default:
                    // @ts-ignore
                    json[k] = numeral(v).value();
                    break;
            }
        });
        return json;
    }
}

interface SuccessResponse {
    error: false;
    response: HistoricalPricesResponse[] | getSymbolResponse;
    currency: string;
    name: string;
}
interface ErrorResponse {
    error: true;
    message: string | unknown;
}

type APIresponse = SuccessResponse | ErrorResponse;

type col1 = {
    previousClose: number,
    open: number,
    // bid: '142.09 x 800'
    bid: string,
    // ask: '142.13 x 1100'
    ask: string,
    // dayRange: '137.68 - 142.24'
    dayRange: string,
    // fiftyTwoWeekRange: '129.04 - 182.94'
    fiftyTwoWeekRange: string,
    volume: number,
    avgVolume: number,
}

type col2 = {
    marketCap: number,
    beta: number,
    peRatio: number,
    eps: number,
    // earningsDate: 'Oct 26, 2022 - Oct 31, 2022',
    earningsDate: string,
    // forwardDividendYield: '0.92 (0.67%)',
    forwardDividendYield: string,
    // exDividendDate: 'Aug 05, 2022',
    exDividendDate: string,
    oneYearTargetEst: number
}

export default YahooStockAPI;
