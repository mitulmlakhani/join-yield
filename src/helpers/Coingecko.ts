import axios from "axios";
import { arbitrumOTokenIds } from "./constansts/coingeckoCodes";

import _forEach from "lodash/forEach";
import _get from "lodash/get";

export const getRates = async (
  contracts: String[],
  toCurrency: String = "usd"
) => {
  try {
    const rates: any = {};
    const tokenIds: any = {};

    _forEach(arbitrumOTokenIds, (value, address) => {
      if (contracts.indexOf(address) > -1) {
        tokenIds[address] = value.id;
      }
    });

    tokenIds["ethereum"] = "ethereum";

    if (Object.values(tokenIds).length) {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${Object.values(
          tokenIds
        ).join(",")}&vs_currencies=${toCurrency}`
      );

      if (response.status === 200) {
        const ratesData = response.data;

        rates["ETH"] = _get(ratesData, `ethereum.${toCurrency}`, 0);

        for (let i = 0; i < contracts.length; i++) {
          const contract: any = contracts[i];
          const arbitrumOTokenId = arbitrumOTokenIds[contract];

          rates[arbitrumOTokenId?.code?.toUpperCase()] = _get(
            ratesData,
            `${arbitrumOTokenId.id}.${toCurrency}`,
            0
          );
        }

        return rates;
      }
    }

    return [];
  } catch (error) {
    return [];
  }
};
