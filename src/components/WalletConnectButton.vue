<template>
    <button type="button" class="button is-primary-accent is-small" @click="connectWallet">{{ props.title ? props.title : "Connect Wallet" }}</button>
</template>

<script setup lang="ts">
import { useRootStore } from '@/stores/RootStore';
import { INFO_BY_CHAIN } from '@/helpers/constansts/chain';
import { Chain } from '@/types/chain';

const props = defineProps(['title']);

const rootStore = useRootStore();

const connectWallet = async () => {
    await rootStore.connectWallet();
    await switchNetwork(rootStore.selectedChain);
    close();
};

const switchNetwork = (chain: Chain) => {
    close();
    const { id } = INFO_BY_CHAIN[chain];

    rootStore.setChain(id);
};

</script>