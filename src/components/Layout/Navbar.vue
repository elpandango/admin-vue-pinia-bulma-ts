<template>
  <nav
      class="navbar has-background-primary-80 has-text-primary-80-invert"
      role="navigation"
      aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">
          Admin Console
        </div>

        <a
            @click.prevent="showMobileNav = !showMobileNav"
            role="button"
            class="navbar-burger"
            :class="{'is-active': showMobileNav}"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            ref="navbarBurgerRef">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
          v-if="true || storeAuth.token"
          id="navbarBasicExample"
          class="navbar-menu"
          :class="{'is-active': showMobileNav}"
          ref="navbarMenuRef">
        <div class="navbar-start">
          <button
              @click="logout"
              class="button is-small is-info mt-3 ml-3">
            Log out {{ storeAuth?.user?.name }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink
              @click="showMobileNav = false"
              class="navbar-item"
              active-class="is-active"
              to="/">
            Home
          </RouterLink>
          <RouterLink
              @click="showMobileNav = false"
              class="navbar-item"
              active-class="is-active"
              to="/add-post">
            Add New Post
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script
    setup
    lang="ts">
/*
  imports
*/

import {ref} from "vue";
import {onClickOutside} from '@vueuse/core';
import {useStoreAuth} from "@/stores/storeAuth";
import router from "@/router";

/*
 mobile nav
*/

let showMobileNav = ref(false);

const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(navbarMenuRef, event => {
  showMobileNav.value = false;
}, {
  ignore: [navbarBurgerRef]
});

const storeAuth = useStoreAuth();

/*
  logout
*/

const logout = () => {
  storeAuth.logoutUser();
  showMobileNav.value = false;
  location.href = '/auth';
}
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
