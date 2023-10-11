import { createRouter, createWebHistory } from 'vue-router';
import MyPositionsView from '@/components/modules/my-positions/MyPositionsView.vue';
import { RouteName } from '@/types/RouteName';
import MarketView from '@/components/modules/market/MarketView.vue';
import JoinYieldView from '../components/modules/JoinYieldView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteName.JOIN_YIELD,
      component: JoinYieldView,
      redirect: { name: RouteName.MARKET },
      children: [
        {
          path: '/my-positions',
          name: RouteName.MY_POSITIONS,
          component: MyPositionsView,
        },
        {
          path: '/market',
          name: RouteName.MARKET,
          component: MarketView,
        },
      ],
    },
  ],
});

export default router;
