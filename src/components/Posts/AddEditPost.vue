<template>
  <div class="card custom-cart-bg p-4 mb-5">

    <div class="field">
      <label class="label">Post title</label>
      <div class="control">
        <input
            class="input"
            type="text"
            v-model="formInputData.title"
            placeholder="My First Post">
      </div>
    </div>

    <div class="field">
      <label class="label">Post image</label>
      <div class="file">
        <label class="file-label">
          <input
              @change="handleFileChange"
              class="file-input"
              type="file"
              name="image"/>
          <span class="file-cta">
      <span class="file-icon">
        <i class="fas fa-upload"></i>
      </span>
      <span class="file-label"> Choose a file… </span>
    </span>
        </label>
      </div>
      <img
          v-if="thumbnail"
          :src="thumbnail"
          class="thumbnail"
          alt="Thumbnail">
    </div>

    <div class="field">
      <label class="label">Post content</label>
      <div class="control">
        <div class="editor-wrap">
          <QuillEditor
              theme="snow"
              toolbar="full"
              content-type="html"
              placeholder="Write content..."
              v-model:content="formInputData.content"
              @update:content="changeHandler"
              @ready="quill = $event"
          />
        </div>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button
            @click="$router.back()"
            class="button is-link is-light mr-2">Cancel
        </button>
        <button
            @click="handleSaveClicked"
            class="button is-link has-background-link">Save Post
        </button>
      </div>
    </div>
  </div>
</template>

<script
    setup
    lang="ts">
/*
  imports
*/
import {onMounted, reactive, ref} from 'vue';
import {QuillEditor} from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {useStorePosts} from "@/stores/storePosts";
import {useRoute} from "vue-router";

const route = useRoute();
const emit = defineEmits(['save-post']);
const storePosts = useStorePosts();
const formInputData = reactive({
  title: '',
  content: '',
  image: null
});
const thumbnail = ref(null);

const handleFileChange = (event: Event) => {
  const image = event?.target?.files[0];
  formInputData.image = image;

  if (image) {
    const reader = new FileReader();
    reader.onload = (e) => {
      thumbnail.value = e.target.result;
    };
    reader.readAsDataURL(image);
  }
};

const handleSaveClicked = () => {
  emit('save-post', formInputData);
};

/*
 Quill
*/

const quill = ref(null);

const changeHandler = (editorContent: any) => {
  formInputData.content = editorContent;
};


onMounted(() => {
  if (route.name === 'edit-post') {
    formInputData.title = storePosts.getCurrentPost.title;
    formInputData.content = storePosts.getCurrentPost.content;
    formInputData.image = storePosts.getCurrentPost.imageUrl;
    thumbnail.value = storePosts.getCurrentPost.imageUrl;
  }
});

</script>

<style>
.thumbnail {
  max-height: 350px;
}
.editor-wrap {
  background-color: #fff;
  border-radius: 4px;
  border: none;
  min-height: 320px;
}

.editor-wrap .ql-toolbar.ql-snow,
.editor-wrap .ql-container.ql-snow {
  border: none;
}
</style>
