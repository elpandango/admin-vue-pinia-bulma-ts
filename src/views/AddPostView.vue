<template>
  <div class="add-edit-post">
    <h1 class="is-size-2 mb-2">Add New Post</h1>
    <AddEditPost
        @save-post="savePostHandler">
    </AddEditPost>
  </div>
</template>

<script
    setup
    lang="ts">
import AddEditPost from "@/components/Posts/AddEditPost.vue";
import {httpRequest} from "@/api";
import {useRouter} from "vue-router";

const router = useRouter();

const savePostHandler = async (data: any) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('image', data.image);

  const result = await httpRequest({method: 'POST', url: '/feed/post', data: formData});

  if (!result?.status) {
    router.push('/');
  }
};
</script>
