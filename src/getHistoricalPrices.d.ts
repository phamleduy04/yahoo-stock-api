export async function getHistoricalPrice(startData: Date, endDate: Date, symbol: string, frequency: '1d' | '1wk' | '1mo') : Promise<HistoricalStock>

interface HistoricalStock {
    error: boolean;
    currency: string;
    response: HistoricalPrices[];
}

interface HistoricalPrices {
    date: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjclose: number;
}