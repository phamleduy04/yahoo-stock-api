export const dateToUnix = (date: string | Date) => {
    if (!date) throw new Error('date is not provided!');
    if (date instanceof Date) return Math.floor(date.getTime() / 1000);
    return Math.round(Date.parse(date) / 1000);
};

export const convertMarketCap = (marketCap: string) => {
    const abbreviationsList = ['T', 'B', 'M', 'K'];
    const abbreviation = marketCap.slice(-1);
    const value = marketCap.slice(0, -1);
    if (!abbreviationsList.includes(abbreviation)) return Number(marketCap);
    if (isNaN(Number(value))) throw new Error('Invalid market cap value!');
    switch (abbreviation) {
        case 'T':
            return Number(value) * 1000000000000;
        case 'B':
            return Number(value) * 1000000000;
        case 'M':
            return Number(value) * 1000000;
        case 'K':
            return Number(value) * 1000;
        default:
            throw new Error('Invalid market cap abbreviation!');
    }
};