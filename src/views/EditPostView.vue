<template>
  <div class="add-edit-post">

    <progress
     v-if="loading"
     class="mt-6 progress is-large is-success"
     max="100"/>

    <template v-else>
      <h1 class="is-size-2 mb-2">Edit Post</h1>
      <Tabs
       :tabs="['Post Details', 'SEO Details']">
        <template #tabContent="{ tabIndex }">
          <div v-if="tabIndex === 0">
            <AddEditPost @save-post="savePostHandler"/>
          </div>
          <div v-if="tabIndex === 1">
            <Metadata/>
          </div>
        </template>
      </Tabs>
    </template>
  </div>
</template>

<script
 setup
 lang="ts">

/*
Imports
*/
import AddEditPost from "@/components/Posts/AddEditPost.vue";
import repositoryFactory from "@/repositories/repositoryFactory";
import {useRouter, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {useStorePosts} from "@/stores/storePosts";
import Tabs from "@/components/Tabs/Tabs.vue";
import Metadata from "@/components/Metadata/Metadata.vue";

/*
Router und Route init
*/

const router = useRouter();
const route = useRoute();
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  const {data} = await repositoryFactory.get('Posts').getPost(route.params.id);
  const storePosts = useStorePosts();
  storePosts.populateCurrentPost(data.post);
  loading.value = false;
});

/*
 form save handling
*/

const savePostHandler = async (postData: any) => {
  const formData = new FormData();
  formData.append('title', postData.title);
  formData.append('content', postData.content);
  formData.append('image', postData.image);

  try {
    const {data} = await repositoryFactory.get('Posts').update(route.params.id, formData);
    if (!data?.status) {
      await router.push('/');
    }
  } catch (err: any) {
    console.log(err);
  }
};
</script>
