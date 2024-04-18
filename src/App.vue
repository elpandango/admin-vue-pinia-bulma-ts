<template>
  <Navbar v-if="route.name !== 'auth'" />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView/>
  </div>
</template>

<script
    setup
    lang="ts">
import {RouterView, useRoute} from 'vue-router';
import Navbar from "@/components/Layout/Navbar.vue";
import {onMounted} from "vue";
import {httpRequest} from "@/api";
import {useStoreAuth} from "@/stores/storeAuth";

const storeAuth = useStoreAuth();
const route = useRoute();

onMounted(async () => {
  const user = await httpRequest({method: 'GET', url: '/user/get-user'});
  // console.log('user: ', user);
  storeAuth.saveUser(user.user);

});
</script>

<style>
@import "bulma/css/bulma.css";
</style>
