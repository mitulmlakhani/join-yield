import { Chain } from "@/types/chain";
import axios from "axios";

export abstract class OxService {
  static swapUrls: { [key: string]: string } = {
    [Chain.ARBITRUM]: "https://arbitrum.api.0x.org/swap/v1/quote",
  };

  static apiKey = import.meta.env.VITE_APP_OX_KEY;

  static async getSwapData(
    chain: Chain,
    buyToken: string,
    sellToken: string,
    buyAmount: number,
    sellAmount: number
  ) {
    try {
      const params: any = {
        buyToken,
        sellToken,
      };

      if (buyAmount > 0) {
        params.buyAmount = buyAmount;
      } else {
        params.sellAmount = sellAmount;
      }

      const response = await axios.get(this.swapUrls[chain], {
        headers: {
          "0x-api-key": this.apiKey,
        },
        params: params,
      });

      if (response.status === 200) {
        const resData = response.data;

        return {
          sellTokenAddress: resData.sellTokenAddress,
          sellAmount: resData.sellAmount,
          buyToken: resData.buyTokenAddress,
          spender: resData.allowanceTarget,
          swapTarget: resData.to,
          swapCallData: resData.data,
        };
      }
    } catch (error) {
      console.log("error", error);

      throw error;
    }
  }
}
