<template>
  <nav
      class="pagination is-centered"
      role="navigation"
      aria-label="pagination">
    <button
        :disabled="!props?.data?.hasPrevPage"
        @click="prevPage"
        class="pagination-previous"
        :class="{'is-disabled': !props?.data?.hasPrevPage}"
        title="This is the first page"
        type="button"
    >Previous
    </button
    >

    <button
        :disabled="!props?.data?.hasNextPage"
        @click="nextPage"
        class="pagination-next"
        :class="{'is-disabled': !props?.data?.hasNextPage}"
        type="button">Next page
    </button>
    <ul class="pagination-list">
      <li
          v-for="page in props.data.lastPage"
          :key="page"><a
          href="#"
          @click="gotoPage(page)"
          :aria-label="`Goto page ${page}`"
          class="pagination-link"
          :class="{'is-current': props?.data?.currentPage === page}">{{ page }}</a></li>

    </ul>
  </nav>
</template>

<script
    setup
    lang="ts">

import {onMounted} from "vue";

const emits = defineEmits(['page-changed']);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
      lastPage: 1,
      nextPage: 1,
      previousPage: 0,
      totalItems: 0,
      posts: []
    })
  }
});

// Go to previous page
const prevPage = () => {
  emits('page-changed', props.data.previousPage);
};

// Go to next page
const nextPage = () => {
  emits('page-changed', props.data.nextPage);
};

// Go to specific page
const gotoPage = (page: number) => {
  emits('page-changed', page);
};

onMounted(() => {
  console.log('props.data: ', props.data);
});

</script>
