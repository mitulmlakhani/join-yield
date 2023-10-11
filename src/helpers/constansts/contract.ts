import { Chain } from "@/types/chain";

export const vaultContrcts: any = {
  [Chain.ARBITRUM]: {
    VAULT_ADDRESS: "0x8f9c583d999217afec5813461cbbc0659a8668b4",
    VAULT_ABI: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_uniswapV3Factory",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "vault",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "VaultCreated",
        type: "event",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "allVaults",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "allVaultsLength",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "pool", type: "address" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "int24", name: "tickLower", type: "int24" },
          { internalType: "int24", name: "tickUpper", type: "int24" },
          { internalType: "uint16", name: "managementFee", type: "uint16" },
          {
            internalType: "contract IVaultSwap",
            name: "vaultSwap",
            type: "address",
          },
        ],
        name: "createVault",
        outputs: [{ internalType: "address", name: "vault", type: "address" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllVaults",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
        name: "getVaults",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "pool", type: "address" }],
        name: "getVaultsByPool",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "uniswapV3Factory",
        outputs: [
          {
            internalType: "contract IUniswapV3Factory",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
};
