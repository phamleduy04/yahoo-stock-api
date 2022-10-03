export async function getSymbol(symbol: string): Promise<Stock>;

interface Stock {
    error: boolean;
    currency: string;
    message?: string;
    response: {
        updated: number;
        previousClose: number;
        open: number;
        bid: string;
        ask: string;
        dayRange: string;
        fiftyTwoWeekRange: string;
        volume: number;
        avgVolume: number;
        marketCap: number;
        beta: number;
        earningsDate: string;
        forwardDividendYield: string;
        exDividendDate: string;
        oneYearTargetEst: number;
    }
}