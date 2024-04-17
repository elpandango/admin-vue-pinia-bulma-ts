<template>
  <Navbar/>
  <div class="container is-max-desktop px-2 py-4">
    <RouterView/>
  </div>
</template>

<script
    setup
    lang="ts">
import {RouterView} from 'vue-router';
import Navbar from "@/components/Layout/Navbar.vue";
import {onMounted} from "vue";


</script>

<style>
@import "bulma/css/bulma.css";
</style>
