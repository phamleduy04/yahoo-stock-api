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
  response: [
    {
      date: 1598418000,
      open: 126.18,
      high: 126.99,
      low: 125.08,
      close: 126.52,
      adjClose: 124.81,
      volume: 163022400
    },
    {
      date: 1598331600,
      open: 124.7,
      high: 125.18,
      low: 123.05,
      close: 124.82,
      adjClose: 123.13,
      volume: 211495600
    },
    {
      date: 1598245200,
      open: 128.7,
      high: 128.79,
      low: 123.94,
      close: 125.86,
      adjClose: 124.15,
      volume: 345937600
    },
    {
      date: 1597986000,
      open: 119.26,
      high: 124.87,
      low: 119.25,
      close: 124.37,
      adjClose: 122.68,
      volume: 338054800
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
    updated: 1673486286910,
    previousClose: 130.73,
    open: 131.25,
    bid: { value: 133.42, shares: 900 },
    ask: { value: 133.47, shares: 1000 },
    dayRange: { low: 130.46, high: 133.49 },
    fiftyTwoWeekRange: { low: 124.17, high: 179.61 },
    volume: 69458949,
    avgVolume: 83633004,
    marketCap: 2124000000000,
    beta: 1.27,
    peRatio: 21.85,
    eps: 6.11,
    earningsDate: { start: 1675317600, end: undefined },
    forwardDividend: 0.92,
    forwardYield: 0.71,
    exDividendDate: 1667538000,
    oneYearTargetEst: 173.25
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
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/phamleduy04"><img src="https://avatars2.githubusercontent.com/u/32657584?v=4?s=100" width="100px;" alt="Duy Pham Le"/><br /><sub><b>Duy Pham Le</b></sub></a><br /><a href="https://github.com/phamleduy04/yahoo-stock-api/commits?author=phamleduy04" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://altitudequest.com"><img src="https://avatars3.githubusercontent.com/u/18537842?v=4?s=100" width="100px;" alt="Rajat"/><br /><sub><b>Rajat</b></sub></a><br /><a href="#ideas-rajataudichya" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/twhtanghk"><img src="https://avatars1.githubusercontent.com/u/1798269?v=4?s=100" width="100px;" alt="Tommy Tang"/><br /><sub><b>Tommy Tang</b></sub></a><br /><a href="https://github.com/phamleduy04/yahoo-stock-api/commits?author=twhtanghk" title="Code">💻</a> <a href="https://github.com/phamleduy04/yahoo-stock-api/issues?q=author%3Atwhtanghk" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://shykeiichi.com"><img src="https://avatars.githubusercontent.com/u/60363370?v=4?s=100" width="100px;" alt="keiichi"/><br /><sub><b>keiichi</b></sub></a><br /><a href="https://github.com/phamleduy04/yahoo-stock-api/commits?author=shykeiichi" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fphamleduy04%2Fyahoo-stock-api.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fphamleduy04%2Fyahoo-stock-api?ref=badge_large)
