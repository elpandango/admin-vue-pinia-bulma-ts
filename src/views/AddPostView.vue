<template>
  <div class="add-edit-post">
    <h1 class="is-size-2 mb-2">Add New Post</h1>

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
import {useRouter} from "vue-router";
import Tabs from "@/components/Tabs/Tabs.vue";
import Metadata from "@/components/Metadata/Metadata.vue";

/*
Router init
*/
const router = useRouter();

const savePostHandler = async (data: any) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('image', data.image);

  try {
    const {data} = await repositoryFactory.get('Posts').addPost(formData);
    if (!data?.status) {
      await router.push('/');
    }

  } catch (err: any) {
    console.log(err);
  }
};
</script>
