<template>
  <div class="all-posts">
    <h1>The list of all bog posts</h1>

    <progress
        v-if="loading"
        class="progress is-large is-success"
        max="100"/>

    <Billet
        v-for="post in blogPosts"
        :title="post?.title"
        :content="post?.content"
        :created-at="post?.createdAt"
        :creator="post?.creator"/>

  </div>
</template>


<script
    setup
    lang="ts">

/*
  imports
*/
import {onMounted, ref} from 'vue';
import Billet from "@/components/Billets/Billet.vue";
import {httpRequest} from "@/api";

/*
  data fetching
*/

const blogPosts = ref([]);
const loading = ref(true);
onMounted(async () => {
  const url = `${import.meta.env.VITE_APP_API_URL}/feed/posts`;
  const result = await httpRequest({method: 'GET', url});
  console.log('result: ', result);
  blogPosts.value = [...result.posts];
  loading.value = false;
});

</script>
