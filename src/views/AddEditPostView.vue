<template>
  <div class="add-edit-post">
    <AddEditPost
        v-model="postContent"
        bg-color="link"
        placeholder="Edit Note"
        label="Edit Note"
        ref="addEditNoteRef">
      <template v-slot:buttons>
        <button
            @click="$router.back()"
            class="button is-link is-light mr-2">Cancel
        </button>
        <button
            @click="handleSaveClicked"
            :disabled="!postContent"
            class="button is-link has-background-link">Save Post
        </button>
      </template>
    </AddEditPost>
  </div>
</template>

<script
    setup
    lang="ts">
import AddEditPost from "@/components/Posts/AddEditPost.vue";
import {ref} from 'vue';
import {useRoute, useRouter} from "vue-router";

const postContent = ref('');

const route = useRoute();
const router = useRouter();

const handleSaveClicked = () => {
  // storeNotes.updateNote(route.params.id, postContent.value);
  router.push('/');
};
</script>
