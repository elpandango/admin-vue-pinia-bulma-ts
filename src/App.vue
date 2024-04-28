<template>
  <Navbar v-if="route.name !== 'auth'"/>
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
import repositoryFactory from "@/repositories/repositoryFactory";
import {useStoreAuth} from "@/stores/storeAuth";

const storeAuth = useStoreAuth();
const route = useRoute();

onMounted(async () => {
  try {
    const {data} = await repositoryFactory.get('User').getUser();
    storeAuth.saveUser(data.user);
  } catch (err: any) {
    console.log(err);
  }
});
</script>

<style>
@import "bulma/css/bulma.css";
</style>
