<template>
  <!-- <div class="the-menu">
    <aside
      class="the-menu-content"
      :class="{ 'is-expanded': isExpanded && !isTouch }"
    >
      <div class="the-menu-content-header">
        <div class="the-menu-logo">
          <div class="the-menu-logo-icons-container">
            <AppIcon
              class="the-menu-logo-brand-icon"
              :name="IconName.LOGO"
            />
            <AppIcon
              class="the-menu-logo-brand-name"
              :name="IconName.BRAND_NAME"
            />
          </div>
          <AppCollapseTransition>
            <span
              v-if="!isExpanded || isTouch"
              class="the-menu-logo-button"
              @click="isExpanded = true"
            >
              <AppIcon
                class="the-menu-logo-button-icon"
                :name="IconName.HAMBURGER"
              />
            </span>
          </AppCollapseTransition>
        </div>
        <AccountCenter class="the-menu-controls" />
      </div>
      <transition name="opacity-transition">
        <div
          v-if="isExpanded || !isTouch"
          v-outer-click="close"
          class="the-menu-content-main"
        >
          <div class="the-menu-content-nav">
            <TheMenuNav
              :to="{ name: RouteName.JOIN_YIELD }"
              :is-expanded="isExpanded"
              class="the-menu-content-nav-item"
              @click="close"
            >
              <template #icon>
                <AppIcon :name="IconName.CASH" />
              </template>
              JOIN_<span class="join-yield-ending">yield</span>
            </TheMenuNav>
           todo: uncomment when implemented
            <TheMenuNav
              :to="{ name: RouteName.MIXING_BOWL }"
              :is-expanded="isExpanded"
              class="the-menu-content-nav-item"
              @click="close"
            >
              <template #icon>
                <AppIcon :name="IconName.MIXING_BOWL" />
              </template>
              Mixing bowl
            </TheMenuNav>
            <TheMenuNav
              :to="{ name: RouteName.GOVERNANCE }"
              :is-expanded="isExpanded"
              class="the-menu-content-nav-item"
              @click="close"
            >
              <template #icon>
                <AppIcon :name="IconName.USERS" />
              </template>
              Governance
            </TheMenuNav> 
          </div>
          <div class="the-menu-content-bottom-nav">
            <TheMenuNav
              :to="{ name: RouteName.MARKET }"
              :is-expanded="isExpanded"
              class="the-menu-content-nav-item"
              @click="close"
            >
              <template #icon>
                <AppIcon :name="IconName.HELP_CIRCLE" />
              </template>
              FAQ
            </TheMenuNav>
            <TheMenuNav
              :to="{ name: RouteName.MARKET }"
              :is-expanded="isExpanded"
              class="the-menu-content-nav-item"
              @click="close"
            >
              <template #icon>
                <AppIcon :name="IconName.TERMINAL" />
              </template>
              Developers
            </TheMenuNav>
            <TheMenuNav
              :to="{ name: RouteName.MARKET }"
              :is-expanded="isExpanded"
              class="the-menu-content-nav-item"
              @click="close"
            >
              <template #icon>
                <AppIcon :name="IconName.GITHUB" />
              </template>
              Github
            </TheMenuNav>
          </div>
        </div>
      </transition>
    </aside>
    <transition name="opacity-transition">
      <div
        v-if="isExpanded && !isTouch"
        class="the-menu-backdrop"
        @click="close"
      />
    </transition>
  </div> -->
  <nav class="navbar col-lg-12 col-12 p-0 fixed-top topNotFixed bgMobOnly d-flex flex-row">
    <div class="navbar-brand-wrapper justify-content-center">
      <div class="navbar-brand-inner-wrapper justify-content-between align-items-center w-100">
        <a class="navbar-brand brand-logo me-5" href="index.html"><img src="/src/assets/design/images/logo-full.png"
            alt="logo" class="mt-2" /></a>
        <a class="navbar-brand brand-logo-mini" href="index.html"><img src="/src/assets/design/images/logoIcon.png"
            alt="logo" /></a>
        <button class="navbar-toggler align-self-center" @click.prevent="toggleSidebar()" type="button"
          data-toggle="minimize">
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </div>
    <div class="navbar-menu-wrapper border-bottom-0 d-flex flex-row-reverse align-items-center justify-content-between">
      <AccountCenter class="the-menu-controls d-block d-sm-none" />
      <button @click.prevent="toggleCanvas()" class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
        type="button" data-toggle="offcanvas">
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </nav>
  <!-- partial -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { IconName } from '@/types/IconName';
import { RouteName } from '@/types/RouteName';
import AppIcon from '@/components/utils/AppIcon.vue';
import { outerClick } from '@/directives/OuterClick';
import AppCollapseTransition from './utils/AppCollapseTransition.vue';
import TheMenuNav from './TheMenuNav.vue';
import AccountCenter from './AccountCenter.vue';
import { useRootStore } from '@/stores/RootStore';

const rootStore = useRootStore();

const toggleSidebar = () => {
  if (rootStore.isWalletConnected) {
    if (document.body.classList.contains('sidebar-icon-only')) {
      document.body.classList.remove('sidebar-icon-only');
    } else {
      document.body.classList.add('sidebar-icon-only');
    }
  }
}

const toggleCanvas = () => {
  const sidebarCanvas: any = document.getElementById("sidebar");
  if (rootStore.isWalletConnected) {
    if (sidebarCanvas?.classList?.contains('active')) {
      sidebarCanvas?.classList?.remove('active')
    } else {
      sidebarCanvas?.classList?.add('active')
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/utils/index.scss' as utils;

$slide-transition-duration: 0.3s;

.the-menu {
  .the-menu-content {
    box-shadow: utils.$shadow-1;
    position: fixed;
    top: 0;
    left: 0;
    width: utils.$menu-size;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 11;
    transition: width $slide-transition-duration;

    @include utils.touch {
      height: utils.$menu-size;
      width: 100%;
      min-height: auto;
      background-color: utils.$color-primary-dark;
    }

    &.is-expanded {
      width: 310px;

      .the-menu-logo {
        padding: utils.spacing-unit(7) 0;
      }

      .the-menu-logo-brand-icon {
        margin-right: utils.spacing-unit(2);
        margin-bottom: 0;
      }

      .the-menu-logo-brand-name {
        display: flex;
        height: 40px;
        width: 104px;
      }

      .the-menu-logo-button-icon {
        opacity: 0;
      }
    }
  }

  .the-menu-backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(utils.$color-primary-dark, 0.4);
    z-index: 10;
  }

  .the-menu-controls {
    display: none;

    @include utils.touch {
      display: block;
    }
  }

  .the-menu-content-header {
    @include utils.touch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: utils.spacing-unit(3) utils.spacing-unit(5);
    }
  }

  .the-menu-content-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    background-color: utils.$color-white;
    top: utils.$menu-size;

    @include utils.touch {
      position: absolute;
      width: 251px;
      box-shadow: utils.$shadow-2;
      border-radius: 8px;
    }
  }

  .join-yield-ending {
    color: utils.$color-primary;
  }
}

.the-menu-logo {
  padding: utils.spacing-unit(4) utils.spacing-unit(2) utils.spacing-unit(2);
  height: 96px;
  display: flex;
  background-color: utils.$color-primary-dark;
  flex-direction: column;
  align-items: center;
  transition: padding $slide-transition-duration;

  @include utils.touch {
    height: auto;
    padding: 0;
    background-color: transparent;
  }

  .the-menu-logo-icons-container {
    display: flex;
    align-items: center;
  }

  .the-menu-logo-brand-icon {
    display: flex;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    margin-bottom: utils.spacing-unit(1);
    transition-duration: $slide-transition-duration;
    transition-property: width, height, margin;

    @include utils.touch {
      display: none;
    }
  }

  .the-menu-logo-brand-name {
    display: flex;
    height: 0;
    width: 0;
    transition-duration: $slide-transition-duration;
    transition-property: width, height;
    flex-shrink: 0;
  }

  .the-menu-logo-button {
    cursor: pointer;
    display: flex;

    .the-menu-logo-button-icon {
      transition: opacity $slide-transition-duration;
      opacity: 1;
      height: 24px;
      width: 24px;
      color: utils.$color-white;
    }
  }
}

.the-menu-content-nav {
  display: flex;
  flex-direction: column;
  padding-top: utils.spacing-unit(2);

  @include utils.touch {
    padding-bottom: utils.spacing-unit(4);
  }

  .the-menu-content-nav-item-text {
    white-space: nowrap;
  }
}

.the-menu-content-bottom-nav {
  padding: utils.spacing-unit(2) 0 utils.spacing-unit(10);
  border-top: 1px solid utils.$color-gray-light;

  @include utils.touch {
    padding-bottom: utils.spacing-unit(6);
  }
}
</style>
