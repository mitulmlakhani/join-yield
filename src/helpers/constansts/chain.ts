import type { ChainInfo } from '@/types/chain';
import { Chain } from '@/types/chain';

export const INFO_BY_CHAIN: Record<Chain, ChainInfo> = {
  [Chain.ARBITRUM]: {
    id: 42161,
    token: 'ETH',
    label: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
  },
  [Chain.ETHEREUM]: {
    id: 1,
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://cloudflare-eth.com',
  },
  [Chain.POLYGON]: {
    id: 137,
    token: 'ETH',
    label: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
  },
  [Chain.ARBITRUM_GOERLI]: {
    id: 421613,
    token: 'ETH',
    label: 'Arbitrum Goerli',
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
  },
};

export const CHAIN_BY_HEX: Record<string, string> = {
  "0xa4b1": Chain.ARBITRUM,
  "0x1": Chain.ETHEREUM,
  "0x89": Chain.POLYGON,
  "0x66eed": Chain.ARBITRUM_GOERLI,
}
