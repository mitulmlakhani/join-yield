import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useRootStore } from '@/stores/RootStore';

import App from './App.vue';
import router from './router';

import './styles/styles.scss';
import 'virtual:svg-icons-register';

const initApp = async () => {
  const app = createApp(App);

  app.use(createPinia());
  const rootStore = useRootStore();

  await rootStore.initWalletInfo();
  app.use(router);
  app.mount('#app');
};

initApp();
