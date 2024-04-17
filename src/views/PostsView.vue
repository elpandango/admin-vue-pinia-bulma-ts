<template>
  <div class="all-posts">

    <progress
        v-if="loading"
        class="mt-6 progress is-large is-success"
        max="100"/>

    <template v-if="!loading && blogPosts.length === 0">
      <p class="pt-6 has-text-centered has-text-grey">
        Unfortunately, there are no posts yet.
      </p>
    </template>

    <Billet
        v-for="post in blogPosts"
        :title="post?.title"
        :content="post?.content"
        :id="post?._id"
        :image-url="post?.imageUrl"
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

interface Post {
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  _id: string;
  creator: any;
}

const blogPosts = ref<Post[]>([]);

const loading = ref(true);
onMounted(async () => {
  const url = '/feed/posts';
  const result = await httpRequest({method: 'GET', url});
  blogPosts.value = [...result.posts];
  loading.value = false;
});

</script>
