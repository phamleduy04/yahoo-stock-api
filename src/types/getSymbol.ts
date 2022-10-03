export interface col1Response {
    previousClose: number,
    open: number,
    bid: {
        value: number,
        shares: number
    },
    ask: {
        value: number,
        shares: number
    },
    dayRange: {
        low: number,
        high: number
    },
    fiftyTwoWeekRange: {
        low: number,
        high: number
    },
    volume: number,
    avgVolume: number
}

export interface col2Response {
    marketCap: number,
    beta: number,
    peRatio: number,
    eps: number,
    earningsDate: {
        start: number,
        end: number,
    },
    forwardDividend: number,
    forwardYield: number,
    exDividendDate: number,
    oneYearTargetEst: number,
}

export interface getSymbolResponse extends col1Response, col2Response {
    updated: number,
}

