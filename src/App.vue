<template>
  <div
    id="join-yield-app"
    class="app"
  >  
  <div class="app-container" style="padding-top:0px;">
     <div class="container-scroller">
      <TheMenu />
          <div class="container-fluid page-body-wrapper">
      <!-- partial:partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <TheMenuNav
              :to="{ name: RouteName.JOIN_YIELD }"
              :is-expanded="isExpanded"
              class="the-menu-content-nav-item"
              @click="close"
            >
              <template #icon>
                <AppIcon :name="IconName.CASH" />
              </template>
              Join <span class="join-yield-ending">Yield</span>
            </TheMenuNav>
          </li>
          <div class="btmSide"> 
            <li><a href="#"><img src="/src/assets/design/images/help.png"> </a></li>
            <li><a href="#"><img src="/src/assets/design/images/terminal.png"> </a></li>
            <li><a href="#"><img src="/src/assets/design/images/github.png"> </a></li>
          </div>
       
        </ul>
      </nav>
    <div class="main-panel">
        <div class="content-wrapper">
           <router-view />    
        </div> 
    </div> 
    </div>
        </div>
  </div>  
</div>
  
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { RouterView } from 'vue-router';
  import TheMenu from './components/TheMenu.vue';
  import { RouteName } from '@/types/RouteName';
  import AppIcon from '@/components/utils/AppIcon.vue';
  import { IconName } from '@/types/IconName';
  import TheMenuNav from './components/TheMenuNav.vue';
  import { outerClick } from '@/directives/OuterClick';
  import ViewportHelper from './helpers/ViewportHelper';

  const isExpanded = ref(true);
  const isTouch = ref(false);
  const route = useRoute();

   watch(() => route.name, () => {
    close();
  });

  const close = () => {
    isExpanded.value = true;
  };

  const checkViewport = () => {
    isTouch.value = ViewportHelper.isTouch();

    ViewportHelper.matchTouch((event: MediaQueryListEvent) => {
      isTouch.value = event.matches;

      if (!isTouch.value) {
        close();
      }
    });
  };

  checkViewport();

  const vOuterClick = outerClick;
</script>

<style lang="scss" scoped>
  @use '@/styles/utils/index.scss' as utils;

  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100%;

    @include utils.touch {
      // padding-top: utils.$menu-size;
    }

    .app-container {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-top: utils.spacing-unit(8);

      @include utils.touch {
        // padding: utils.spacing-unit(4) utils.spacing-unit(3);
      }
    }
  }
</style>
