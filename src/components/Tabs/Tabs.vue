<template>
  <div class="tabs">
    <ul>
      <li
          v-for="(tab, index) in tabs"
          :key="index"
          @click="changeTab(index)"
          :class="{ 'is-active': activeTab === index }"
          class="tab">
        <a>{{ tab }}</a>
      </li>
    </ul>

    <slot
        name="tabContent"
        :tabIndex="activeTab"></slot>
  </div>
</template>

<script
    setup
    lang="ts">
/*
Imports
*/
import {ref} from 'vue';

/*
Props
*/
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
});

/*
Active Tab init and logic
*/
const activeTab = ref(0);

const changeTab = (index: number) => {
  activeTab.value = index;
};
</script>

<style scoped>
.tabs {
  flex-wrap: wrap;
}

.tabs ul {
  width: 100%;
}
</style>
