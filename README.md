# yahoo-stock-api
💰 NPM package to get stock and historical price from finance.yahoo.com 

# ⚠️ Breaking changes ⚠️
## v2.0.0 of this package have breaking changes and can affect your code, please review it and change according to the documentation below!


![GitHub top language](https://img.shields.io/github/languages/top/phamleduy04/yahoo-stock-api?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/phamleduy04/yahoo-stock-api?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/phamleduy04/yahoo-stock-api?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues-raw/phamleduy04/yahoo-stock-api?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/phamleduy04/yahoo-stock-api?style=for-the-badge)
![Travis (.org)](https://img.shields.io/travis/phamleduy04/yahoo-stock-api?label=travis-ci&logo=travis&style=for-the-badge)
![Node.js CI](https://github.com/phamleduy04/yahoo-stock-api/workflows/Node.js%20CI/badge.svg)
![Code quality](https://img.shields.io/scrutinizer/quality/g/phamleduy04/yahoo-stock-api?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/yahoo-stock-api?style=for-the-badge)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/yahoo-stock-api?style=for-the-badge)
![[![Visits Badge](https://badges.pufler.dev/visits/phamleduy04/yahoo-stock-api)](https://badges.pufler.dev)
## Installaion
`npm i yahoo-stock-api` or `yarn add yahoo-stock-api` if you use yarn.
## API
**Everything in this API will return Promise so remember to use** `async/await` **or** `callback`

`getHistoricalPrices:  async  function({ startDate,  endDate,  symbol,  frequency })`

- startDate: Date
- endDate: Date
- symbol: String (stock symbol)
- frequency: String ('1d', '1wk' or '1mo' only)
  - 1d: 1day
  - 1wk: 1 week
  - 1mo: 1 month

Return Promise

<details>
  <summary>Example</summary>
  
  ### Code
  ```js
  const yahooStockAPI = require('yahoo-stock-api').default;

const yahoo = new yahooStockAPI();

const startDate = new Date('08/21/2020');
const endDate = new Date('08/26/2020');
yahoo.getHistoricalPrices({ startDate, endDate, symbol: 'AAPL', frequency: '1d' }).then(console.log);
  ```
  ### Response
  ```js
  {
  error: false,
  currency: 'USD',
  data: [
    {
      date: 1598448600,
      open: 504.7200012207031,
      high: 507.9700012207031,
      low: 500.3299865722656,
      close: 506.0899963378906,
      volume: 40617600,
      adjclose: 506.0899963378906
    },
    {
      date: 1598362200,
      open: 498.7900085449219,
      high: 500.7200012207031,
      low: 492.2099914550781,
      close: 499.29998779296875,
      volume: 52873900,
      adjclose: 499.29998779296875
    },
    {
      date: 1598275800,
      open: 514.7899780273438,
      high: 515.1400146484375,
      low: 495.75,
      close: 503.42999267578125,
      volume: 86484400,
      adjclose: 503.42999267578125
    },
    {
      date: 1598016600,
      open: 477.04998779296875,
      high: 499.4700012207031,
      low: 477,
      close: 497.4800109863281,
      volume: 84513700,
      adjclose: 497.4800109863281
    }
  ]
}
  ```
  
</details>

`getSymbol({ symbol })`
- symbol: String (stock symbol)

Return Promise

<details>
  <summary>Example</summary>
  
  ### Code
  ```js
  const yahooStockAPI = require('yahoo-stock-api').default;

const yahoo = new yahooStockAPI();

yahoo.getSymbol({ symbol: 'AAPL' }).then(console.log);
  ```
  
  ### Response
  ```js
{
  error: false,
  currency: 'USD',
  response: {
    updated: 1664829357507,
    previousClose: 138.2,
    open: 138.21,
    bid: { value: 142.42, shares: 1100 },
    ask: { value: 142.44, shares: 1300 },
    dayRange: { low: 137.68, high: 143.07 },
    fiftyTwoWeekRange: { low: 129.04, high: 182.94 },
    volume: 113578851,
    avgVolume: 78897638,
    marketCap: 2289000000000,
    beta: 1.23, 
    peRatio: 23.55,
    eps: 6.05,
    earningsDate: { start: 1666760400, end: 1667192400 },
    forwardDividend: 0.92,
    forwardYield: 0.67,
    exDividendDate: 1659675600,
    oneYearTargetEst: 183.5
    }
 }
```
</details>

## Test
- Clone this Repo (git clone https://github.com/phamleduy04/yahoo-stock-api)
- Open Terminal (Command Line) in the folder.
- npm i
- npm test


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/phamleduy04"><img src="https://avatars2.githubusercontent.com/u/32657584?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Duy Pham Le</b></sub></a><br /><a href="https://github.com/phamleduy04/yahoo-stock-api/commits?author=phamleduy04" title="Code">💻</a></td>
    <td align="center"><a href="http://altitudequest.com"><img src="https://avatars3.githubusercontent.com/u/18537842?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rajat</b></sub></a><br /><a href="#ideas-rajataudichya" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/twhtanghk"><img src="https://avatars1.githubusercontent.com/u/1798269?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tommy Tang</b></sub></a><br /><a href="https://github.com/phamleduy04/yahoo-stock-api/commits?author=twhtanghk" title="Code">💻</a> <a href="https://github.com/phamleduy04/yahoo-stock-api/issues?q=author%3Atwhtanghk" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fphamleduy04%2Fyahoo-stock-api.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fphamleduy04%2Fyahoo-stock-api?ref=badge_large)
