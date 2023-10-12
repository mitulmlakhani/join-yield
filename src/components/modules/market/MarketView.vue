<template>
  <div class="market-view">
    <!-- <div class="tab-content py-0 px-0" v-if=""> -->
    <div class="tab-content py-0 px-0">
      <div class="tab-pane show active" id="markets" role="tabpanel" aria-labelledby="markets-tab">
        <div class="d-flex flex-wrap justify-content-xl-start px-lg-5 px-md-5 pb-5">
          <div class="p-3 item">
            <div class="d-flex flex-column justify-content-around">
              <h5 class="hFive mb-1">
                Market Size
                <a href="#" data-toggle="tooltip" data-placement="top" title="Information here......!!"><img
                    src="/src/assets/design/images/Info.png" class="img-responsive" /></a>
              </h5>
              <h4 class="hFour me-2 mb-0"><span>$</span> 5.30M</h4>
            </div>
          </div>
          <div class="p-3 item">
            <div class="d-flex flex-column justify-content-around">
              <h5 class="hFive mb-1">Fees Generated</h5>
              <h4 class="hFour me-2 mb-0"><span>$</span> {{ GeneralHelper.formatToCurrency(totalFees) }}</h4>
            </div>
          </div>
          <div class="p-3 item">
            <div class="d-flex flex-column justify-content-around">
              <h5 class="hFive mb-1">TVL by chain</h5>
              <h4 class="hFour me-2 mb-0"><span>$</span> {{ GeneralHelper.formatToCurrency(totalTVL) }}</h4>
            </div>
          </div>
        </div>
        <div class="greyBG">
          <div class="row mtMinus">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card bdrRadius">
                <div class="card-body p-3">
                  <p class="card-title mb-1">Arbitrum Assets</p>
                  <div class="table-responsive mktTbl">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th class="text-left">Position</th>
                          <th>Dex</th>
                          <th>Strategy</th>
                          <th>
                            TVL
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Information here......!!">
                              <img src="/src/assets/design/images/Info.png" class="img-responsive" /></a>&emsp;&emsp;
                          </th>
                          <th>
                            APR
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Information here......!!">
                              <img src="/src/assets/design/images/Info.png" class="img-responsive" /></a>
                          </th>
                          <th>&emsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="market in  Object.values(rootStore.markets) ">
                          <td class="text-left mobOnlyRow p-3">
                            <img :src="'/icons/' + _get(market, 'token0.symbol', '') + '.svg'" width="24" height="24" />
                            <img class="logo2" :src="'/icons/' + _get(market, 'token1.symbol', '') + '.svg'" width="24"
                              height="24" />
                            <!-- <img :src="market.logo" width="20" /> -->
                            {{ _get(market, 'token0.symbol', '') }}/{{ _get(market, 'token1.symbol', '') }}
                          </td>
                          <td>
                            <img src="/src/assets/design/images/Uniswap.png" width="20" class="ms-4" />&emsp;&emsp;
                          </td>
                          <td>Label</td>
                          <td><small>$</small> {{ GeneralHelper.formatToCurrency(market.tvl, 2) }}</td>
                          <td>2.06<small>%</small></td>
                          <td class="text-right" v-if="rootStore.isWalletConnected">
                            <a href="#" @click="openDeposit(market.id)" class="btn btnTbl border-bottom-0 w-100"
                              data-bs-toggle="modal" data-bs-target="#deposit2">Deposit</a>
                          </td>
                          <td v-else>
                            <WalletConnectButton title="Connect Wallet" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Deposit ETH/USDC -->
  <div class="modal fade " id="deposit2" tabindex="-1" aria-labelledby="deposit2" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content wdtModal">
        <div class="modal-header border-bottom-0">
          <h3 class="modal-title" id="deposit2">Deposit {{ _get(pool, 'token0.symbol',
            '').toUpperCase() }}/{{ _get(pool, 'token1.symbol',
    '').toUpperCase() }} </h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!--  -->
          <div class="card-body p-0">
            <!-- nav tabs -->
            <ul class="nav  nav-tabs grpBtns" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="one-tab" data-bs-toggle="tab" href="#one" role="tab" aria-controls="one"
                  aria-selected="true">One asset</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" id="two-tab" data-bs-toggle="tab" href="#two" role="tab" aria-controls="two"
                  aria-selected="false">Two assets</a>
              </li>
            </ul>

            <div class="tab-content py-0 px-0">
              <div class="tab-pane fade active show" id="one" role="tabpanel" aria-labelledby="one-tab">
                <!-- tab 1 content here -->
                <div class="divOuter p-1">

                  <div class="inputShield">
                    <div class="input-group mb-0">
                      <input type="text" class="form-control grpBtn p-0 border-0" v-model="oneAmount" placeholder="0"
                        aria-label="" aria-describedby="dpstAdd">
                      <i class="mdi mdi-close-circle me-1 mt-2  text-secondary" @click="oneAmount = '';"></i>
                      <ul class="navbar-nav navbar-nav-right drpDwn">
                        <li class="nav-item nav-profile dropdown">
                          <a class="nav-link dropdown-toggle bgGrey" href="#" data-bs-toggle="dropdown"
                            id="profileDropdown" aria-expanded="false">
                            <img :src="oneAssetSelected.logo" width="20" height="20" class="mr-05" />
                            <span class="nav-profile-name"> {{ oneAssetSelected?.symbol || 'ETH' }}</span>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right navbar-dropdown drpDwn"
                            aria-labelledby="profileDropdown" style="">

                            <a class="dropdown-item"
                              v-for="oneToken in [_get(pool, 'token0', []), _get(pool, 'token1', []), ...oneTokens]"
                              @click="oneAssetSelected = oneToken">
                              <img :src="oneToken?.logo" width="20" height="20" /> {{ oneToken?.symbol }}
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <p class="cptn"><span>$ {{ GeneralHelper.formatNumber((rates[_get(oneAssetSelected,
                      'symbol', '').toUpperCase()] || 0) * Number(oneAmount), 2) }}</span> <span class="right">Balance:
                        {{
                          balanceData[_get(oneAssetSelected,
                            'symbol', '').toUpperCase()] }} {{ _get(oneAssetSelected,
      'symbol', '').toUpperCase() }} &emsp;
                        <b @click="oneAmount = balanceData[_get(oneAssetSelected,
                          'symbol', '').toUpperCase()];">Max</b></span></p>
                  </div>

                  <!-- Not Enough Funds Alert-->
                  <div class="NenoughFunds d-none">
                    <p class="mb-0">Not Enough Funds</p>
                  </div>
                  <!-- Not Enough Funds Alert-->

                  <!-- table here -->
                  <div class="table-responsive myPosTbl mt-4">
                    <table class="table">
                      <tbody>

                        <tr>
                          <td>APY <a href="#" data-toggle="tooltip" data-placement="top"
                              title="Annual percentage yield is a compounding one-year interest rate."><img
                                src="/src/assets/design/images/Info.png" class="img-responsive"></a></td>
                          <td class="text-right">10 <small>%</small></td>
                        </tr>
                        <tr>
                          <td>Gas Fee</td>
                          <td class="text-right"> <small>$</small> 5.00</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <!-- table here -->

                </div> <!--outer div ends here-->

                <!-- alert  -->
                <div class="bg-pink mb-3  d-none w-100 ">
                  <div class="row">
                    <div class="col-7 d-flex align-items-center">
                      <p class="mb-0"> <i class="mdi mdi-alert-circle-outline align-bottom px-1"></i> </p>
                      <p>Switch to Arbitrum network to continue. </p>
                    </div>
                    <div class="col-5"><span class=""> <a href="#" class="btn addNew"> Switch Network</a> </span></div>
                  </div>

                </div>
                <!-- alert -->



                <!-- button starts here -->
                <p class="green mt-4"> <i class="mdi mdi-check-circle-outline"></i> Access confirmed</p>

                <div class="w-100 my-2">
                  <p class="text-center" style="word-break: break-all;">{{ txStatus }}</p>
                </div>

                <button type="button" class="d-none btn depositBtn mt-4">Confirm</button>
                <button type="button" @click="processOneDeposit" class="btn depositBtn mt-2">Deposit</button>

                <!-- after confirmation this 'done' div -->

                <div class="card-body addNewCol d-none text-center p-3">
                  <div class="text-center mt-5 mb-3"><img src="/src/assets/design/images/success.png"
                      alt="Add new Position"> </div>
                  <h4>Done!</h4>
                  <p class="msgFlash">You've successfully deposited 1.00 ETH equal to $ 1,0000.00.</p>
                  <div class="mb-2"></div>
                  <a href="#" class="btn depositBtn border-bottom-0 w-100 mt-1">Got it</a>
                </div>

                <!-- after confirmation this 'done' div -->

                <!-- alert -->
                <div class="card-body addNewCol d-none  text-center p-3">
                  <div class="text-center mt-5 mb-3">
                    <!-- <img src="/src/assets/design/images/warning.png"
                      alt="Add new Position">  -->
                  </div>
                  <h4>Oops!</h4>
                  <p class="msgFlash">Something went wrong. Check your walllet connection and try again.</p>
                  <div class="mb-2"></div>
                  <a href="#" class="btn depositBtn border-bottom-0 w-100 mt-1">Got it</a>
                </div>

                <!-- alert -->



                <!-- button ends here -->

                <!-- tab 1 content here -->

              </div>

              <!-- TAB 2 -->
              <div class="tab-pane fade" id="two" role="tabpanel" aria-labelledby="two-tab">
                <!-- tab 2 content here -->
                <div class="divOuter2 p-1">
                  <!-- input shield first row -->
                  <div class="inputShield">
                    <div class="input-group mb-0">
                      <input type="text" class="form-control grpBtn p-0 border-0" placeholder="0"
                        @keyup="handleFromChange" v-model="fromAmount" aria-label="" aria-describedby="dpstAdd">
                      <i class="mdi mdi-close-circle mt-2 text-secondary" @click="fromAmount = ''; toAmount = '';"></i>
                      <span class="input-group-text border-0 bg-white hdtitle" id="dpstAdd"><img class="mr-05"
                          :src="_get(pool, 'token0.logo', '')" width="20" height="20"> {{ `${_get(pool, 'token0.symbol',
                            '').toUpperCase()}` }}</span>
                    </div>
                    <p class="cptn"><span>$ {{ GeneralHelper.formatNumber((rates[_get(pool,
                      'token0.symbol', '').toUpperCase()] || 0) * Number(fromAmount), 2) }}</span> <span
                        class="right">Balance: {{ balanceData[_get(pool,
                          'token0.symbol', '').toUpperCase()] }} {{ `${_get(pool, 'token0.symbol', '').toUpperCase()}` }}
                        &emsp;
                        <b @click="fromAmount = balanceData[_get(pool,
                          'token0.symbol', '').toUpperCase()]; fetchToAmount(balanceData[_get(pool,
                            'token0.symbol', '').toUpperCase()]);">Max</b></span></p>
                  </div>

                  <!-- Not Enough Funds Alert-->
                  <div class="NenoughFunds d-none">
                    <p class="mb-0">Not Enough Funds</p>
                  </div>
                  <!-- Not Enough Funds Alert-->

                  <!-- input shield 2nd row  -->

                  <div class="inputShield">
                    <div class="input-group mb-0">
                      <input type="text" class="form-control grpBtn p-0 border-0" placeholder="0" @keyup="handleToChange"
                        v-model="toAmount" aria-label="" aria-describedby="dpstAdd">
                      <i class="mdi mdi-close-circle mt-2 text-secondary" @click="fromAmount = ''; toAmount = '';"></i>
                      <span class="input-group-text border-0 bg-white hdtitle" id="dpstAdd"><img class="mr-05"
                          :src="_get(pool, 'token1.logo', '')" width="20" height="20"> {{ `${_get(pool, 'token1.symbol',
                            '').toUpperCase()}` }}</span>
                    </div>

                    <p class="cptn"><span>$ {{ GeneralHelper.formatNumber((rates[_get(pool,
                      'token1.symbol', '').toUpperCase()] || 0) * Number(toAmount), 2) }}</span> <span
                        class="right">Balance: {{ balanceData[_get(pool,
                          'token1.symbol', '').toUpperCase()] }} {{ `${_get(pool,
    'token1.symbol',
    '').toUpperCase()}` }} &emsp;
                        <b @click="toAmount = balanceData[_get(pool,
                          'token1.symbol', '').toUpperCase()]; fetchFromAmount(balanceData[_get(pool,
                            'token1.symbol', '').toUpperCase()]);">Max</b></span></p>
                  </div>

                  <!-- Not Enough Funds Alert-->
                  <div class="NenoughFunds d-none">
                    <p class="mb-0">Not Enough Funds</p>
                  </div>
                  <!-- Not Enough Funds Alert-->
                </div> <!--outer div ends here-->


                <!-- table here -->
                <div class="table-responsive myPosTbl mt-4">
                  <table class="table">
                    <tbody>

                      <tr>
                        <td>APY <a href="#" data-toggle="tooltip" data-placement="top"
                            title="Annual percentage yield is a compounding one-year interest rate."><img
                              src="/src/assets/design/images/Info.png" class="img-responsive"></a></td>
                        <td class="text-right">10 <small>%</small></td>
                      </tr>
                      <tr>
                        <td>Gas Fee</td>
                        <td class="text-right"> <small>$</small> 5.00</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
                <!-- table here -->


                <!-- button starts here -->
                <p class="green mt-4"> <i class="mdi mdi-check-circle-outline"></i> Access confirmed</p>

                <div class="w-100 my-2">
                  <p class="text-center" style="word-break: break-all;">{{ txStatus }}</p>
                </div>

                <button type="button" class="d-none btn depositBtn mt-4">Confirm</button>
                <button type="button" :disabled="Number(fromAmount) <= 0 || Number(toAmount) <= 0"
                  @click="processTwoDeposit" class="btn depositBtn mt-2">Deposit</button>

                <!-- after confirmation this 'done' div -->

                <div class="card-body addNewCol d-none text-center p-3">
                  <div class="text-center mt-5 mb-3"><img src="/src/assets/design/images/success.png"
                      alt="Add new Position"> </div>
                  <h4>Done!</h4>
                  <p class="msgFlash">You've successfully deposited <b>1.00 ETH</b> and <b>1,000.00 UDSC</b> equal to
                    <b>$ 1,0000.00</b>.
                  </p>
                  <div class="mb-2"></div>
                  <a href="#" class="btn depositBtn border-bottom-0 w-100 mt-1">Got it</a>
                </div>

                <!-- after confirmation this 'done' div -->
                <!-- button ends here -->
                <!-- tab 2 content here -->

              </div>
              <!-- TAB 2 -->
            </div>

            <!-- nav tabs -->

          </div>
          <!--  -->
        </div>
      </div>
    </div>
  </div>
  <!-- modal ends here -->

  <!-- <h1 v-else>Market</h1> -->
</template>

<script setup lang="ts">

import WalletConnectButton from '@/components/WalletConnectButton.vue';
import { useRootStore } from '@/stores/RootStore';
import { ContractService } from '@/services/ContractService';
import { onMounted, ref, watch } from 'vue';
import { GeneralHelper } from '@/helpers/GeneralHelper';
import _get from "lodash/get";
import _find from "lodash/find";
import _debounce from "lodash/debounce";
import _forEach from "lodash/forEach";
import { Chain } from '@/types/chain';
import { ethers } from 'ethers';
import { getRates } from '@/helpers/Coingecko';

const rootStore = useRootStore();

let balanceData: any = ref({});

let totalFees = ref(0);
let totalTVL = ref(0);

let oneAmount = ref("");
let fromAmount: any = ref("");
let toAmount: any = ref("");
let pool = ref({});

const rates: any = ref({});

let ethToken = { id: 'ETH', symbol: 'ETH', logo: '/icons/ETH.svg', decimals: 18 };

let oneTokens: Array<any> = [
  ethToken,
  {
    id: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', symbol: 'USDT', logo: '/icons/USDT.svg', decimals: 6
  },
  {
    id: '0xaf88d065e77c8cc2239327c5edb3a432268e5831', symbol: 'USDC', logo: '/icons/USDC.svg', decimals: 6
  },
  {
    id: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', symbol: 'DAI', logo: '/icons/DAI.svg', decimals: 18
  }
]

let oneAssetSelected: any = ref(ethToken);

let txStatus = ref("");

const fetchPools = async () => {
  const pools = await ContractService.getPools(rootStore.selectedChain as Chain);

  if (pools.length)
    rootStore.fetchMarkets(pools);
}

const fetchPoolData = async (marketId: string) => {
  const poolVaults = await ContractService.getPoolsVault();
  const vault = (poolVaults || {})[marketId];
  const vaultDetails = await ContractService.getVaultDetails(vault);
  const poolDetails = await ContractService.getPoolDetails(marketId);

  return {
    tick: poolDetails.slot0.tick,
    tickLower: vaultDetails.tickLower,
    tickUpper: vaultDetails.tickUpper,
    vault: vault
  };
};

const loadBalances = async (tokens: any) => {
  const _balances: any = {};

  const balances = await Promise.all(tokens.filter((t: any) => t.id !== "ETH").map(async (token: any) => _balances[token?.symbol] = await ContractService.getTokenBalance(rootStore.walletAddress, token.id, token.decimals, rootStore.walletState?.provider)));

  const ethBalance = await ContractService.getBalance(Chain.ARBITRUM, rootStore.walletAddress, rootStore.walletState?.provider);

  _balances['ETH'] = Number(ethBalance);

  balanceData.value = { ...balanceData.value, ..._balances };
}

const openDeposit = async (marketId: string) => {
  txStatus.value = `Loading pool data...`;
  fromAmount.value = "";
  toAmount.value = "";

  const poolData = await fetchPoolData(marketId);
  const marketData: any = _get(rootStore.markets, marketId, {});

  const oneTokenIds = oneTokens.filter(t => t.id !== "ETH").map(t => t.id);

  const tokens = [_get(marketData, 'token0.id', ""), _get(marketData, 'token1.id', ""), ...oneTokenIds];
  const _rates = await getRates(tokens, 'usd');
  rates.value = _rates;

  const price = Math.pow(1.0001, poolData.tick);
  const priceUpper = Math.pow(1.0001, poolData.tickUpper);
  const priceLower = Math.pow(1.0001, poolData.tickLower);

  const L = (1 * Math.sqrt(price) * Math.sqrt(priceUpper)) / (Math.sqrt(priceUpper) - Math.sqrt(price));
  const token1Value = L * (Math.sqrt(price) - Math.sqrt(priceLower));

  const token0USD = Number(rates.value[_get(marketData, 'token0.symbol', '')]);
  const token1USD = Number(rates.value[_get(marketData, 'token1.symbol', '')]) * token1Value;

  const token0Ratio = token0USD / (token0USD + token1USD);
  const token1Ratio = token1USD / (token0USD + token1USD);

  await loadBalances([
    { ...(marketData?.token0 || {}) },
    { ...(marketData?.token1 || {}) },
    ...oneTokens
  ]);

  await setTimeout(() => { txStatus.value = ""; }, 500);

  pool.value = {
    poolId: marketId,
    ...poolData,
    token0: { ...(marketData?.token0 || {}) },
    token1: { ...(marketData?.token1 || {}) },
    sqrtPrice: marketData?.sqrtPrice,
    token0Ratio,
    token1Ratio,
  };
}

const fetchFromAmount = _debounce(async (_toAmount) => {
  fromAmount.value = "...";

  if (!Number(_toAmount)) {
    fromAmount.value = _toAmount;
    return;
  }

  const poolData: any = { ...pool?.value };

  const price = 1 / Math.pow(1.0001, poolData.tick);
  const priceUpper = 1 / Math.pow(1.0001, poolData.tickUpper);
  const priceLower = 1 / Math.pow(1.0001, poolData.tickLower);

  const L = (Number(_toAmount) * Math.sqrt(price) * Math.sqrt(priceUpper)) / (Math.sqrt(priceUpper) - Math.sqrt(price));

  const _fromAmount = L * (Math.sqrt(price) - Math.sqrt(priceLower));

  fromAmount.value = GeneralHelper.formatNumber(_fromAmount);
}, 500);

const fetchToAmount = _debounce(async (_fromAmount) => {
  toAmount.value = "...";

  if (!Number(_fromAmount)) {
    toAmount.value = _fromAmount;
    return;
  }

  const poolData: any = { ...pool?.value };
  // const token1Decimals = _get(poolData, 'token1.decimals', 18);

  const price = Math.pow(1.0001, poolData.tick);
  const priceUpper = Math.pow(1.0001, poolData.tickUpper);
  const priceLower = Math.pow(1.0001, poolData.tickLower);

  const L = (Number(_fromAmount) * Math.sqrt(price) * Math.sqrt(priceUpper)) / (Math.sqrt(priceUpper) - Math.sqrt(price));
  const _toAmount = L * (Math.sqrt(price) - Math.sqrt(priceLower));
  toAmount.value = GeneralHelper.formatNumber(_toAmount);
}, 500);

const getSwapData = async () => {
  const swapData: any = [];
  const poolData: any = { ...pool?.value };

  const token0RAmt = GeneralHelper.formatNumber(Number(oneAmount?.value) * poolData.token0Ratio);
  const token1RAmt = GeneralHelper.formatNumber(Number(oneAmount?.value) * poolData.token1Ratio);

  const sellAmount0 = Number(ethers.utils.parseUnits(token0RAmt.toString(), (oneAssetSelected?.value?.decimals || 18)));
  const sellAmount1 = Number(ethers.utils.parseUnits(token1RAmt.toString(), (oneAssetSelected?.value?.decimals || 18)));

  if ([_get(poolData, 'token0.symbol', ''), _get(poolData, 'token1.symbol', '')].indexOf(oneAssetSelected?.value?.symbol) === -1) {
    swapData[0] = await ContractService.getSwapData(Chain.ARBITRUM, _get(poolData, 'token0.id', ''), oneAssetSelected?.value?.id, 0, sellAmount0);
    swapData[1] = await ContractService.getSwapData(Chain.ARBITRUM, _get(poolData, 'token1.id', ''), oneAssetSelected?.value?.id, 0, sellAmount1);
  } else {
    if (oneAssetSelected?.value?.symbol === _get(poolData, 'token0.symbol', '')) {
      swapData[0] = ContractService.emptySwapData;
      swapData[1] = await ContractService.getSwapData(Chain.ARBITRUM, _get(poolData, 'token1.id', ''), _get(poolData, 'token0.id', ''), 0, sellAmount1);
    } else {
      swapData[0] = await ContractService.getSwapData(Chain.ARBITRUM, _get(poolData, 'token0.id', ''), _get(poolData, 'token1.id', ''), 0, sellAmount0);
      swapData[1] = ContractService.emptySwapData;
    }
  }

  return swapData;
}

const processOneDeposit = async () => {
  try {
    const poolData: any = { ...pool?.value };
    const token0Decimals = _get(poolData, 'token0.decimals', 18);
    const token1Decimals = _get(poolData, 'token1.decimals', 18);

    const swapData = await getSwapData();

    if (oneAssetSelected?.value?.symbol !== "ETH") {
      const token0Allowance = await ContractService.getAllowance((oneAssetSelected?.value?.id || ""), poolData.vault, rootStore.walletAddress, rootStore.walletState?.provider);
      const token0AllowanceAmt = ethers.utils.formatUnits(token0Allowance, (oneAssetSelected?.value?.decimals || 18));

      if (Number(token0AllowanceAmt) < Number(oneAmount.value)) {
        txStatus.value = `Please confirm ${oneAssetSelected?.value?.symbol || "token"} allowance on wallet.`;
        const { hash: fHash, wait: fWait } = await ContractService.processAllowance((oneAssetSelected?.value?.id || ""), poolData.vault, ethers.utils.parseUnits(oneAmount.value, (oneAssetSelected?.value?.decimals || 18)), rootStore.walletState?.provider);
        txStatus.value = `processing: ${fHash}`;

        await fWait();
      }
    }

    // if (oneAssetSelected?.value?.symbol === _get(poolData, 'token0.symbol', '')) {
    //   const token0Allowance = await ContractService.getAllowance(_get(poolData, 'token0.id', ""), poolData.vault, rootStore.walletAddress, rootStore.walletState?.provider);
    //   const token0AllowanceAmt = ethers.utils.formatUnits(token0Allowance, _get(poolData, 'token0.decimals', 18));

    //   if (Number(token0AllowanceAmt) < Number(oneAmount.value)) {
    //     txStatus.value = "Please confirm token0 allowance on wallet.";
    //     const { hash: fHash, wait: fWait } = await ContractService.processAllowance(_get(poolData, 'token0.id', ""), poolData.vault, ethers.utils.parseUnits(oneAmount.value, _get(poolData, 'token0.decimals', 18)), rootStore.walletState?.provider);
    //     txStatus.value = `processing: ${fHash}`;

    //     await fWait();
    //   }
    // }

    // if (oneAssetSelected?.value?.symbol === _get(poolData, 'token1.symbol', '')) {
    //   const token1Allowance = await ContractService.getAllowance(_get(poolData, 'token1.id', ""), poolData.vault, rootStore.walletAddress, rootStore.walletState?.provider);
    //   const token1AllowanceAmt = ethers.utils.formatUnits(token1Allowance, _get(poolData, 'token1.decimals', 18));

    //   if (Number(token1AllowanceAmt) < Number(oneAmount.value)) {
    //     txStatus.value = "Please confirm token1 allowance on wallet.";
    //     const { hash: tHash, wait: tWait } = await ContractService.processAllowance(_get(poolData, 'token1.id', ""), poolData.vault, ethers.utils.parseUnits(oneAmount.value, _get(poolData, 'token0.decimals', 18)), rootStore.walletState?.provider);
    //     txStatus.value = `processing: ${tHash}`;

    //     await tWait();
    //   }
    // }

    txStatus.value = "Please confirm deposit transaction on wallet.";

    const token0RAmt = GeneralHelper.formatNumber(Number(oneAmount?.value) * poolData.token0Ratio);
    const token1RAmt = GeneralHelper.formatNumber(Number(oneAmount?.value) * poolData.token1Ratio);

    const { hash, wait } = await ContractService.deposit({
      network: Chain.ARBITRUM,
      vault: poolData.vault,
      value: oneAssetSelected?.value?.symbol === "ETH" ? ethers.utils.parseEther(oneAmount?.value) : 0,
      amount0: oneAssetSelected?.value?.symbol === _get(poolData, 'token0.symbol', '') ? ethers.utils.parseUnits(Number(token0RAmt).toString(), _get(poolData, 'token0.decimals', '')) : 0,
      amount1: oneAssetSelected?.value?.symbol === _get(poolData, 'token1.symbol', '') ? ethers.utils.parseUnits(Number(token1RAmt).toString(), _get(poolData, 'token1.decimals', '')) : 0,
      swap0: swapData[0],
      swap1: swapData[1],
      address: rootStore.walletAddress,
      amount0Min: ethers.utils.parseUnits((Number(token0RAmt) - (Number(token0RAmt) * 1) / 100).toFixed(6), token0Decimals),
      amount1Min: ethers.utils.parseUnits((Number(token1RAmt) - (Number(token1RAmt) * 1) / 100).toFixed(6), token1Decimals),
      provider: rootStore.walletState?.provider
    });

    txStatus.value = `processing: ${hash}`;

    await wait();

    fromAmount.value = "";
    toAmount.value = "";

    txStatus.value = `Deposit Done!`;
  } catch (error: any) {
    txStatus.value = error?.error?.message || error.message;
  }
}

const processTwoDeposit = async () => {
  try {
    const poolData: any = { ...pool?.value };

    const token0Decimals = _get(poolData, 'token0.decimals', 18);
    const token1Decimals = _get(poolData, 'token1.decimals', 18);

    const amount0 = ethers.utils.parseUnits(Number(fromAmount.value).toFixed(6), token0Decimals);
    const amount1 = ethers.utils.parseUnits(Number(toAmount.value).toFixed(6), token1Decimals);

    const token0Allowance = await ContractService.getAllowance(_get(poolData, 'token0.id', ""), poolData.vault, rootStore.walletAddress, rootStore.walletState?.provider);
    const token1Allowance = await ContractService.getAllowance(_get(poolData, 'token1.id', ""), poolData.vault, rootStore.walletAddress, rootStore.walletState?.provider);

    const token0AllowanceAmt = ethers.utils.formatUnits(token0Allowance, _get(poolData, 'token0.decimals', 18));
    const token1AllowanceAmt = ethers.utils.formatUnits(token1Allowance, _get(poolData, 'token1.decimals', 18));

    if (Number(token0AllowanceAmt) < Number(fromAmount.value)) {
      txStatus.value = `Please confirm ${_get(poolData, 'token0.symbol', 'token0')} allowance on wallet.`;
      const { hash: fHash, wait: fWait } = await ContractService.processAllowance(_get(poolData, 'token0.id', ""), poolData.vault, amount0, rootStore.walletState?.provider);
      txStatus.value = `processing: ${fHash}`;

      await fWait();
    }

    if (Number(token1AllowanceAmt) < Number(toAmount.value)) {
      txStatus.value = `Please confirm ${_get(poolData, 'token1.symbol', 'token1')} allowance on wallet.`;
      const { hash: tHash, wait: tWait } = await ContractService.processAllowance(_get(poolData, 'token1.id', ""), poolData.vault, amount1, rootStore.walletState?.provider);
      txStatus.value = `processing: ${tHash}`;

      await tWait();
    }

    txStatus.value = "Please confirm deposit transaction on wallet.";

    const { hash, wait } = await ContractService.deposit({
      network: Chain.ARBITRUM,
      vault: poolData.vault,
      amount0: amount0,
      amount1: amount1,
      swap0: ContractService.emptySwapData,
      swap1: ContractService.emptySwapData,
      address: rootStore.walletAddress,
      amount0Min: ethers.utils.parseUnits((Number(fromAmount.value) - ((Number(fromAmount.value) * 2) / 100)).toFixed(6), token0Decimals),
      amount1Min: ethers.utils.parseUnits((Number(toAmount.value) - ((Number(toAmount.value) * 2) / 100)).toFixed(6), token1Decimals),
      provider: rootStore.walletState?.provider
    });

    txStatus.value = `processing: ${hash}`;

    await wait();

    fromAmount.value = "";
    toAmount.value = "";

    txStatus.value = `Deposit Done!`;
  } catch (error: any) {
    console.log(error);
    txStatus.value = error?.error?.message || error.message;
  }
}

const handleFromChange = (event: any) => {
  fromAmount.value = event.target?.value;
  fetchToAmount(event.target?.value)
};

const handleToChange = (event: any) => {
  toAmount.value = event.target?.value;
  fetchFromAmount(event.target?.value)
};

watch(() => rootStore.markets, () => {
  let _totalFees = 0;
  let _totalTVL = 0;

  _forEach(rootStore.markets, (market) => {
    _totalFees += Number(market.fees);
    _totalTVL += Number(market.tvl);
  })

  totalFees.value = _totalFees;
  totalTVL.value = _totalTVL;
});

watch(() => rootStore.selectedChain, () => {
  fetchPools();
});

onMounted(() => {
  fetchPools();
});
</script>

<style lang="scss" scoped>
@use "@/styles/utils/index.scss" as utils;

.market-view {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.logo2 {
  margin-left: -10px;
}

.mr-05 {
  margin-right: 0.5rem;
}

.mt-9px {
  margin-top: 9px !important;
}
</style>
