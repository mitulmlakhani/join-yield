import { defineStore } from "pinia";
import { Web3Service } from "@/services/Web3Service";
import type { WalletState } from "@web3-onboard/core/dist/types";
import { Chain } from "@/types/chain";
import { INFO_BY_CHAIN } from "@/helpers/constansts/chain";
import { Market } from "@/types/Market";
import { UniswapService } from "@/services/UniswapService";

interface RootState {
  selectedChain: Chain;
  selectedMarket: Market;
  markets: any[];
}

export const useRootStore = defineStore("root", {
  state: (): RootState => ({
    selectedChain: Chain.ARBITRUM,
    selectedMarket: Market.ARBITRUM,
    markets: [],
  }),
  getters: {
    walletAddress(): string {
      return this.walletState?.accounts[0]?.address ?? "";
    },
    chainId(): number {
      return parseInt(this.walletState?.chains[0]?.id ?? "", 16);
    },
    chain(): Chain | null {
      return (
        (Object.entries(INFO_BY_CHAIN).find(
          ([_key, value]) => value.id === this.chainId
        )?.[0] as Chain | undefined) ?? null
      );
    },
    walletState(): WalletState | null {
      const connectedWallet = Web3Service.getWalletStateRef();

      return connectedWallet.value;
    },
    isWalletConnected(): boolean {
      return Boolean(this.walletState);
    },
    // markets(state): any {
    //   return state.markets;
    // }
  },
  actions: {
    async initWalletInfo() {
      Web3Service.init();
      await Web3Service.reconnectLastWallet();
    },
    async connectWallet() {
      await Web3Service.connectWallet();
    },
    async disconnectWallet() {
      await Web3Service.disconnectWallet();
    },
    async setChain(chainId: number) {
      await Web3Service.setChain(chainId);
    },
    async fetchMarkets(poolIds: string[]) {
      this.markets = await UniswapService.getPools(poolIds);
    },
  },
});
