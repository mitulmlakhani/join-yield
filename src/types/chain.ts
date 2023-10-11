export enum Chain {
  ARBITRUM = 'ARBITRUM',
  ETHEREUM = 'ETHEREUM',
  POLYGON = 'POLYGON',
  ARBITRUM_GOERLI = 'ARBITRUM_GOERLI',
}

export interface ChainInfo {
  id: number;
  label: string;
  token: string;
  rpcUrl: string;
}
