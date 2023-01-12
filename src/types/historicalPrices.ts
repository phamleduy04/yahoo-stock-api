export type HistoricalPricesOptions = {
    startDate: Date,
    endDate: Date,
    symbol: string,
    frequency: '1d' | '1wk' | '1mo',
};

export type HistoricalPricesResponse = {
    date: number,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    adjClose: number,
}