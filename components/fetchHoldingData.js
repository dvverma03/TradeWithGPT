import axios from 'axios';
import {holdings} from '../constants/dummy';

const fetchHoldingData = async () => {
  const vsCurrency = 'usd';

  try {
    const data = await Promise.all(
      holdings.map(async e => {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-cg-api-key': 'CG-qwVagypqLiS8oTA91ZfTv5qB',
          },
        };

        const queryParams = new URLSearchParams({
          vs_currency: vsCurrency,
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: true,
          price_change_percentage: '7d',
          ids: e.id,
        });

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?${queryParams.toString()}`,
          options,
        );

        return response.data;
      }),
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchHoldingData;
