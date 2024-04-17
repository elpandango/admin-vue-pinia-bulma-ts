<template>
  <div class="add-edit-post">

    <progress
        v-if="loading"
        class="mt-6 progress is-large is-success"
        max="100"/>

    <template v-else>
      <h1 class="is-size-2 mb-2">Edit Post</h1>
      <AddEditPost @save-post="savePostHandler"/>
    </template>
  </div>
</template>

<script
    setup
    lang="ts">
import AddEditPost from "@/components/Posts/AddEditPost.vue";
import {httpRequest} from "@/api";
import {useRouter, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {useStorePosts} from "@/stores/storePosts";

const router = useRouter();
const route = useRoute();
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const url = `/feed/post/${route.params.id}`;
  const result = await httpRequest({method: 'GET', url});
  const storePosts = useStorePosts();

  storePosts.populateCurrentPost(result.post);

  console.log('result: ', result);
  loading.value = false;
});

/*
 form save handling
*/

const savePostHandler = async (data: any) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('image', data.image);

  const result = await httpRequest({method: 'PUT', url: `/feed/post/${route.params.id}`, data: formData});

  console.log('savePostHandler result: ', result);

  if (!result?.status) {
    router.push({name: 'posts'});
  }
};
</script>
