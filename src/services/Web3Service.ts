import { init, useOnboard } from "@web3-onboard/vue";
import injectedModule from "@web3-onboard/injected-wallets";
import type { WalletState } from "@web3-onboard/core/dist/types";
import ledger from "@web3-onboard/ledger";
import coinbase from "@web3-onboard/coinbase";
import frontier from "@web3-onboard/frontier";
import gnosis from "@web3-onboard/gnosis";
import mew from "@web3-onboard/mew-wallet";
import sequence from "@web3-onboard/sequence";
import trezor from "@web3-onboard/trezor";
import walletconnect from "@web3-onboard/walletconnect";
import zeal from "@web3-onboard/zeal";
import { INFO_BY_CHAIN } from "@/helpers/constansts/chain";
import { Chain } from "@/types/chain";
import type { ComputedRef } from "vue";
import type { ConnectOptions } from "@web3-onboard/core";

export abstract class Web3Service {
  static init() {
    init({
      wallets: [
        injectedModule(),
        walletconnect(),
        coinbase(),
        frontier(),
        gnosis(),
        ledger(),
        mew(),
        sequence(),
        trezor({
          appUrl: "test.com",
          email: "test@mail.com",
        }),
        zeal(),
      ],
      chains: [
        INFO_BY_CHAIN[Chain.ARBITRUM],
        // INFO_BY_CHAIN[Chain.ETHEREUM],
        // INFO_BY_CHAIN[Chain.POLYGON],
        // INFO_BY_CHAIN[Chain.ARBITRUM_GOERLI],
      ],
      accountCenter: {
        desktop: {
          enabled: false,
        },
        mobile: {
          enabled: false,
        },
      },
    });
  }

  static async connectWallet(options?: ConnectOptions) {
    const { connectWallet } = useOnboard();

    await connectWallet(options);
  }

  static async reconnectLastWallet() {
    const label = this.getAlreadyConnectedWallet();

    if (!label) {
      return;
    }

    await this.connectWallet({ autoSelect: { label, disableModals: true } });
  }

  static async disconnectWallet() {
    const { disconnectWallet } = useOnboard();
    const label = this.getAlreadyConnectedWallet();

    if (!label) {
      return;
    }

    await disconnectWallet({ label });
  }

  static async setChain(chainId: number) {
    const { setChain } = useOnboard();
    const wallet = this.getAlreadyConnectedWallet();

    if (!wallet) {
      return;
    }

    await setChain({ wallet, chainId: `0x${chainId.toString(16)}` });
  }

  static getWalletStateRef(): ComputedRef<WalletState | null> {
    const { connectedWallet } = useOnboard();

    return connectedWallet;
  }

  static getAlreadyConnectedWallet(): string | null {
    const { alreadyConnectedWallets } = useOnboard();
    
    return alreadyConnectedWallets.value?.[0] ?? null;
  }
}
