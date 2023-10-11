<template>
  <div class="my-positions-view" v-if="rootStore.isWalletConnected">
    <div class="tab-content py-0 px-0">
      <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
        <div class="d-flex flex-wrap justify-content-xl-start px-lg-5 px-md-5 pb-5">

          <div class="p-3 item">
            <!-- <i class="mdi mdi-currency-usd me-3 icon-lg text-danger"></i> -->
            <div class="d-flex flex-column justify-content-around">
              <h5 class="hFive mb-1">Total Value <a href="#" data-toggle="tooltip" data-placement="top"
                  title="Information here......!!"><img src="/src/assets/design/images/Info.png"
                    class="img-responsive"></a></h5>
              <h4 class="hFour me-2 mb-0"><span>$</span> {{ totalValue }}</h4>
            </div>
          </div>
          <div class="p-3 item">
            <!-- <i class="mdi mdi-currency-usd me-3 icon-lg text-danger"></i> -->
            <div class="d-flex flex-column justify-content-around">
              <h5 class="hFive mb-1">Total Profit</h5>
              <h4 class="hFour me-2 mb-0"><span>$</span> 0.00</h4>
            </div>
          </div>
        </div>

        <!-- overlapping section -->
        <div class="greyBG">
          <div class="row mtMinus">

            <div v-for="position in Object.values(positions)" style="min-width: 300px;" class="col-md-4 col-lg-2 grid-margin stretch-card">
              <div class="card bdrRadius">
                <div class="card-body p-3">
                  <p class="card-title">
                    <!-- <img src="/src/assets/design/images/ethc-usdc.png" width="40">  -->
                    <img :src="'/icons/' + _get(position, 'token0.symbol', '') + '.svg'" width="20" />
                    <img class="logo2" :src="'/icons/' + _get(position, 'token1.symbol', '') + '.svg'"
                      width="20" />
                    {{ _get(position,
                      'token0.symbol', '') }}/{{ _get(position, 'token1.symbol', '') }} <img
                      src="/src/assets/design/images/Uniswap.png" width="20" class="right">
                  </p>
                  <!-- table here -->
                  <div class="table-responsive myPosTbl">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td>Value</td>
                          <td class="text-right"><small>$</small>{{ position?.currentValue }}</td>
                        </tr>
                        <tr>
                          <td>Profit</td>
                          <td class="text-right"><small>$</small> --</td>
                        </tr>
                        <tr>
                          <td>APY <a href="#" data-toggle="tooltip" data-placement="top"
                              title="Information here......!!"><img src="/src/assets/design/images/Info.png"
                                class="img-responsive"></a></td>
                          <td class="text-right">2.06 <small>%</small></td>
                        </tr>
                        <tr>
                          <td colspan="2" class="border-0"><a href="#" class="btn btnTbl border-bottom-0 w-100"
                              data-bs-toggle="modal" data-bs-target="#deposit2">Deposit</a></td>
                        </tr>
                        <tr>
                          <td class="border-0">
                            <!-- <a href="#" @click="openDeposit(market.id)" class="btn btnTbl border-bottom-0 w-100"
                              >Deposit</a> -->
                            <a href="#" v-on:click="openWithdraw(position?.id)" class="btn btnTblOpn1"
                              data-bs-toggle="modal" data-bs-target="#withdraw2">Withdraw</a>
                          </td>
                          <td class="border-0">
                            <a href="#" class="btn btnTblOpn1">Claim Profit</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- table here -->
                </div>
              </div>
            </div>

            <div class="col-md-4 col-lg-2 grid-margin stretch-card" style="min-width: 300px;">
              <div class="card bdrRadius">
                <div class="card-body addNewCol text-center p-3">
                  <div class="text-center mt-5 mb-3"><img src="/src/assets/design/images/add-new.png"
                      alt="Add new Position"> </div>
                  <h4>Add New Position</h4>
                  <p>Deposit single or mixed assets and got easy yield.</p>
                  <div class="mb-5"></div>
                  <a href="#" class="btn addNew border-bottom-0 w-100 mt-md-2 mt-lg-1 mt-xl-1 mt-xxl-4">Go to the
                    Market</a>

                </div>
              </div>
            </div>
          </div>
          <!--end row here-->
        </div>
        <!-- overlapping section -->
      </div>
    </div>
  </div>

  <!-- Modal Withdraw -->
  <div class="modal fade" id="withdraw2" tabindex="-1" aria-labelledby="withdraw2" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content wdtModal">
        <div class="modal-header border-bottom-0">
          <h3 class="modal-title" id="withdraw2">Withdraw {{ _get(pool, 'token0.symbol',
            '').toUpperCase() }}/{{ _get(pool, 'token1.symbol',
    '').toUpperCase() }}</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!--  -->
          <div class="card-body p-0">
            <!-- nav tabs -->
            <ul class="nav nav-tabs grpBtns" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="two-tab" data-bs-toggle="tab" href="#two" role="tab" aria-controls="two"
                  aria-selected="true">Two assets</a>
              </li>
            </ul>

            <div class="tab-content py-0 px-0">
              <!-- TAB 2 -->
              <div class="tab-pane fade active show" id="two" role="tabpanel" aria-labelledby="two-tab">
                <!-- tab 2 content here -->
                <div class="divOuter2 p-1">
                  <!-- input shield first row -->
                  <div class="inputShield">
                    <div class="input-group mb-0">
                      <input type="text" class="form-control grpBtn p-0 border-0" placeholder="0"
                        @keyup="handleFromWChange" v-model="fromWAmount" aria-label="" aria-describedby="dpstAdd" />
                      <i class="mdi mdi-close-circle mt-9px mt-3 text-secondary" @click="fromWAmount = ''; toWAmount = '';"></i>
                      <span class="input-group-text border-0 bg-white hdtitle" id="dpstAdd">
                        <img class="mr-05" :src="_get(pool, 'token0.logo', '')" width="20" height="20" />
                        {{ `${_get(pool, 'token0.symbol', '').toUpperCase()}`
                        }}</span>
                    </div>

                    <p class="cptn">
                      <span>$ {{ pool.token0PositionAmt }}</span>
                      <span class="right">Balance: {{ pool.token0Position }} {{ `${_get(pool, 'token0.symbol',
                        '').toUpperCase()}` }} &emsp;
                        <b @click="fromWAmount = pool.token0Position; toWAmount = pool.token1Position;">Max</b></span>
                    </p>
                  </div>

                  <!-- Not Enough Funds Alert-->
                  <div class="NenoughFunds d-none">
                    <p class="mb-0">Not Enough Funds</p>
                  </div>
                  <!-- Not Enough Funds Alert-->

                  <!-- input shield 2nd row  -->

                  <div class="inputShield">
                    <div class="input-group mb-0">
                      <input type="text" class="form-control grpBtn p-0 border-0" placeholder="0" @keyup="handleToWChange"
                        v-model="toWAmount" aria-label="" aria-describedby="dpstAdd" />
                      <i class="mdi mdi-close-circle mt-3 text-secondary mt-9px" @click="fromWAmount = ''; toWAmount = '';"></i>
                      <span class="input-group-text border-0 bg-white hdtitle" id="dpstAdd">
                        <img class="mr-05" :src="_get(pool, 'token1.logo', '')" width="20" height="20" />
                        {{ `${_get(pool, 'token1.symbol', '').toUpperCase()}`
                        }}</span>
                    </div>

                    <p class="cptn">
                      <span>$ {{ pool.token1PositionAmt }}</span>
                      <span class="right">Balance: {{ pool.token1Position }} {{ `${_get(pool, 'token1.symbol',
                        '').toUpperCase()}` }} &emsp;
                        <b @click="fromWAmount = pool.token0Position; toWAmount = pool.token1Position;">Max</b></span>
                    </p>
                  </div>

                  <!-- Not Enough Funds Alert-->
                  <div class="NenoughFunds d-none">
                    <p class="mb-0">Not Enough Funds</p>
                  </div>
                  <!-- Not Enough Funds Alert-->
                </div>
                <!--outer div ends here-->

                <!-- table here -->
                <div class="table-responsive myPosTbl mt-4">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td>
                          APY
                          <a href="#" data-toggle="tooltip" data-placement="top"
                            title="Annual percentage yield is a compounding one-year interest rate."><img
                              src="/src/assets/design/images/Info.png" class="img-responsive" /></a>
                        </td>
                        <td class="text-right">10 <small>%</small></td>
                      </tr>
                      <tr>
                        <td>Gas Fee</td>
                        <td class="text-right"><small>$</small> 5.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- table here -->

                <!-- button starts here -->
                <p class="green mt-4">
                  <i class="mdi mdi-check-circle-outline"></i> Access confirmed
                </p>

                <div class="w-100 my-2">
                  <p class="text-center" style="word-break: break-all;">{{ txStatus }}</p>
                </div>

                <button type="button" class="d-none btn withdrawBtn mt-4">
                  Confirm
                </button>
                <button type="button"
                  :disabled="Number(fromWAmount) <= 0 || Number(toWAmount) <= 0 || Number(fromWAmount) > pool.token0Position"
                  @click="processTwoWithdraw" class="btn depositBtn mt-2">
                  Withdraw
                </button>

                <!-- after confirmation this 'done' div -->

                <div class="card-body addNewCol d-none text-center p-3">
                  <div class="text-center mt-5 mb-3">
                    <img src="/src/assets/design/images/success.png" alt="Add new Pool" />
                  </div>
                  <h4>Done!</h4>
                  <p class="msgFlash">
                    You've successfully withdrawed <b>1.00 ETH</b> and
                    <b>1,000.00 UDSC</b> equal to <b>$ 1,0000.00</b>.
                  </p>
                  <div class="mb-2"></div>
                  <a href="#" class="btn withdrawBtn border-bottom-0 w-100 mt-1">Got it</a>
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
</template>

<script setup lang="ts">
import StatItem from '@/components/StatItem.vue';
import AppIcon from '@/components/utils/AppIcon.vue';
import { IconName } from '@/types/IconName';
import { useRootStore } from '@/stores/RootStore';
import PositionCard from '@/components/PositionCard.vue';
import AppAlert from '@/components/utils/AppAlert.vue';
import { AlertType } from '@/types/AlertType';
import { computed, ref, watch, onMounted } from 'vue';
import { INFO_BY_CHAIN } from '@/helpers/constansts/chain';
import _forEach from "lodash/forEach";
import _get from "lodash/get";
import _filter from "lodash/filter";
import _debounce from "lodash/debounce";
import { ContractService } from '@/services/ContractService';
import { Chain } from '@/types/chain';
import { ethers } from 'ethers';
import { getRates } from '@/helpers/Coingecko';
import { GeneralHelper } from '@/helpers/GeneralHelper';

const rootStore = useRootStore();

const connectWallet = () => {
  rootStore.connectWallet();
};

const switchNetwork = () => {
  rootStore.setChain(INFO_BY_CHAIN[rootStore.selectedChain].id);
};

const txStatus = ref("");
const positions: any = ref({});
const rates: any = ref({});
const totalValue = ref(0);
const pool: any = ref({});


const fromWAmount: any = ref("");
const toWAmount: any = ref("");

// const openWithdraw()

const handleFromWChange = (event: any) => {
  fetchToWAmount(event.target?.value)
}
const handleToWChange = (event: any) => {
  fetchFromWAmount(event.target?.value)
}

const fetchToWAmount = _debounce((val: any) => {
  const tokenfromPosition = pool?.value?.token0Position;
  const tokentoPosition = pool?.value?.token1Position;

  if (Number(val) > (pool?.value?.token0Position || 0)) {
    txStatus.value = "Insufficient Balance."
  }

  if (Number(val) > 0) {
    const fromPercentage = (Number(val) * 100) / tokenfromPosition;

    toWAmount.value = GeneralHelper.formatNumber((tokentoPosition * fromPercentage) / 100);
  } else {
    toWAmount.value = ""
  }

}, 500);

const fetchFromWAmount = _debounce((val: any) => {
  const tokenfromPosition = pool?.value?.token0Position;
  const tokentoPosition = pool?.value?.token1Position;

  if (Number(val) > (pool?.value?.token1Position || 0)) {
    txStatus.value = "Insufficient Balance."
  }

  if (Number(val) > 0) {
    const toPercentage = (Number(val) * 100) / tokentoPosition;

    fromWAmount.value = GeneralHelper.formatNumber((tokenfromPosition * toPercentage) / 100);
  } else {
    fromWAmount.value = "";
  }

}, 500);

const processTwoWithdraw = async () => {
  try {
    const tokenfromPosition = pool?.value?.token0Position;
    const balanceOf = pool?.value?.balanceOf;
    const percentage = (Number(fromWAmount.value) * 100) / tokenfromPosition;
    const lpValue = fromWAmount > tokenfromPosition ? pool?.value?.balanceOfWei : ethers.utils.parseUnits(((balanceOf * percentage) / 100).toString(), pool?.value?.decimals);

    const amount0 = (fromWAmount.value * percentage) / 100;
    const amount1 = (toWAmount.value * percentage) / 100;
    const amount0Min = GeneralHelper.formatNumber(amount0 - ((fromWAmount.value * 1) / 100));
    const amount1Min = GeneralHelper.formatNumber(amount1 - ((toWAmount.value * 1) / 100));

    txStatus.value = "Please confirm withdraw transaction on wallet.";

    const { hash, wait } = await ContractService.withdraw({
      network: Chain.ARBITRUM,
      vault: pool?.value?.vault,
      provider: rootStore.walletState?.provider,
      shares: lpValue,
      address: rootStore.walletAddress,
      amount0Min: ethers.utils.parseUnits(amount0Min.toString(), _get(pool?.value, 'token0.decimals', 18)),
      amount1Min: ethers.utils.parseUnits(amount1Min.toString(), _get(pool?.value, 'token1.decimals', 18)),
    });

    txStatus.value = `processing: ${hash}`;

    await wait();

    fromWAmount.value = "";
    toWAmount.value = "";

    txStatus.value = `Withdraw Done!`;
  } catch (error: any) {
    console.log(error);
    txStatus.value = error?.error?.message || error.message;
  }
}

const fetchPools = async () => {
  const pools = await ContractService.getPools(rootStore.selectedChain as Chain);

  if (pools.length)
    rootStore.fetchMarkets(pools);
}

const preparePositions = async () => {
  const markets = rootStore?.markets || {};
  const poolVaults = await ContractService.getPoolsVault();
  const _positions: any = [];
  const tokens: any = [];
  let _rates: any = {};
  let _totalValue: number = 0;

  const marketIds: any = Object.keys(markets || {});

  for (let i = 0; i < marketIds.length; i++) {
    const market = markets[marketIds[i]];
    tokens.push(_get(market, 'token0.id', ""), _get(market, 'token1.id', ""));

    _rates = await getRates(tokens, 'usd')
    rates.value = _rates;
  }

  for (let i = 0; i < marketIds.length; i++) {
    const market = markets[marketIds[i]];
    const vault = (poolVaults || {})[market.id];
    const balances = await ContractService.getPoolBalance(vault, rootStore.walletAddress, Chain.ARBITRUM);

    if (Number(balances?.balanceOf) > 0) {
      const token0Position = Number(ethers.utils.formatUnits(balances.myPositions._amount0ForShares, _get(market, 'token0.decimals', 18)));
      const token1Position = Number(ethers.utils.formatUnits(balances.myPositions._amount1ForShares, _get(market, 'token1.decimals', 18)));
      const token0PositionAmt = token0Position * _rates[_get(market, 'token0.symbol', "")];
      const token1PositionAmt = token1Position * _rates[_get(market, 'token1.symbol', "")];
      const currentValue = GeneralHelper.formatNumber(Number(token0PositionAmt) + Number(token1PositionAmt));

      const row = {
        ...market,
        balanceOfWei: balances.balanceOfWei,
        decimals: balances.decimals,
        balanceOf: Number(balances.balanceOf),
        token0Position: GeneralHelper.formatNumber(token0Position),
        token1Position: GeneralHelper.formatNumber(token1Position),
        token0PositionAmt: GeneralHelper.formatNumber(token0PositionAmt),
        token1PositionAmt: GeneralHelper.formatNumber(token1PositionAmt),
        currentValue: currentValue,
        vault: vault
      };

      _positions[marketIds[i]] = { ...row };

      _totalValue += Number(currentValue);
    }
  }

  positions.value = _positions;
  totalValue.value = _totalValue;
}

const openWithdraw = (id: string) => {
  pool.value = positions.value[id] || {};
}

watch(() => rootStore.markets, () => preparePositions());

onMounted(() => {
  fetchPools();
});

const networkLabel = computed(() => INFO_BY_CHAIN[rootStore.selectedChain].label);
</script>

<style lang="scss" scoped>
@use '@/styles/utils/index.scss' as utils;

.my-positions-view {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  .my-positions-view-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    background-color: utils.$color-mist;
  }

  .my-positions-view-top {
    padding-bottom: utils.spacing-unit(20);
  }

  .my-positions-cards {
    margin-top: - utils.spacing-unit(10);
  }

  .my-positions-view-stats {
    display: flex;
    width: 100%;
    margin-bottom: utils.spacing-unit(10);
    padding: 0 utils.spacing-unit(2);
  }

  .my-positions-view-alert-block {
    width: 100%;
  }

  .my-positions-view-stat-item {
    margin-right: utils.spacing-unit(10);
    min-width: 128px;

    &:last-child {
      margin-right: 0;
    }
  }

  .connect-wallet-info-content {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: utils.$color-white;
    padding: utils.spacing-unit(23) 0 utils.spacing-unit(31);
    box-shadow: 0 0 2px rgba(35, 7, 57, 0.16);
    border-radius: 8px;
  }

  .connect-wallet-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 380px;
    text-align: center;

    .connect-wallet-info-icon {
      margin-bottom: utils.spacing-unit(2);
    }

    .connect-wallet-info-title {
      @include utils.apply-styles(utils.$text-header);
      margin-bottom: utils.spacing-unit(2);
    }

    .connect-wallet-info-text {
      color: utils.$color-navi;
      margin-bottom: utils.spacing-unit(8);
    }
  }

  .button {
    margin-bottom: utils.spacing-unit(2);
  }

  .logo2 {
    margin-left: -10px;
  }
}

.mr-05 {
  margin-right: 0.5rem;
}
.mt-9px {
  margin-top: 9px !important;
}
</style>
