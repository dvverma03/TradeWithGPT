const marketTabs = [
    {
        id: 1,
        title: "Cryptoassets",
    },
    {
        id: 2,
        title: "Exchanges",
    },
]

//API
// My Holdings

// export function getHoldings(holdings=[], currency='usd', orderBy="market_cap_desc", sparkline=true, priceChangePerc='7d')
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}

// Coin Market
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}

const constants = {
    marketTabs
};

export default constants;