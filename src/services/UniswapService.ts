import axios from "axios";

import _forEach from "lodash/forEach";
import _get from "lodash/get";

export abstract class UniswapService {
  static async getPools(poolIds: string[]) {
    let data = JSON.stringify({
      query: `query ($poolIds: [String!]!) {
            pools(where: {id_in: $poolIds}) {
              id
              token0 {
                id
                name
                symbol
                decimals
              }
              token1 {
                id
                name
                symbol
                decimals
              }
              totalValueLockedUSD
              feesUSD
              sqrtPrice
            }
          }`,
      variables: {
        poolIds: poolIds,
      },
    });

    let config = {
      method: "post",

      url: "https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal",
      // url: "https://thegraph.com/hosted-service/subgraph/messari/uniswap-v3-arbitrum",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const pools = response?.data?.data?.pools || [];
      const poolsData: any = {};

      _forEach(pools, (pool) => {
        poolsData[pool.id] = {
          id: pool.id,
          logo: `/src/assets/design/images/${_get(
            pool,
            "token0.symbol",
            ""
          ).toLowerCase()}-${_get(
            pool,
            "token1.symbol",
            ""
          ).toLowerCase()}.png`,
          token0: {
            ...pool.token0,
            logo: `/icons/${_get(pool, "token0.symbol", "")}.svg`,
          },
          token1: {
            ...pool.token1,
            logo: `/icons/${_get(pool, "token1.symbol", "")}.svg`,
          },
          strategy: "Level",
          tvl: pool.totalValueLockedUSD,
          fees: pool.feesUSD,
          sqrtPrice: pool.sqrtPrice,
          APR: "2.06%",
        };
      });

      return poolsData;
    } else {
      return [];
    }
  }
}
