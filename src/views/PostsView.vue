<template>
  <div class="all-posts">

    <progress
     v-if="loading"
     class="mt-6 progress is-large is-success"
     max="100"/>

    <template v-if="!loading && blogPostResponse.posts?.length === 0">
      <p class="pt-6 has-text-centered has-text-grey">
        Unfortunately, there are no posts yet.
      </p>
    </template>

    <template v-if="!loading && blogPostResponse.posts?.length > 0">
      <Billet
       v-for="post in blogPostResponse.posts"
       :key="post?._id"
       @delete-clicked="deleteClickHandler"
       :title="post?.title"
       :content="post?.content"
       :id="post?._id"
       :image-url="post?.imageUrl"
       :created-at="post?.createdAt"
       :creator="post?.creator"/>

      <Pagination v-if="blogPostResponse.lastPage > 1"
                  @page-changed="pageChangeHandler"
                  :data="blogPostResponse"/>
    </template>

  </div>

  <div
   v-if="modalVisible"
   class="modal is-active">
    <div
     @click="modalVisible = false"
     class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure you want to delete this post?</p>
        <button
         @click="modalVisible = false"
         class="delete"
         aria-label="close"></button>
      </header>
      <footer class="modal-card-foot">
        <div class="buttons">
          <button
           @click="deleteClicked"
           class="button is-danger">Delete
          </button>
          <button
           @click="modalVisible = false"
           class="button">Cancel
          </button>
        </div>
      </footer>
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
import Billet from "@/components/Billets/Billet.vue";
import repositoryFactory from "@/repositories/repositoryFactory";
import Pagination from "@/components/Pagination/Pagination.vue";

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

type PostResponse = {
  currentPage: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  lastPage: number,
  nextPage: number,
  previousPage: number,
  totalItems: number,
  posts: Post[]
};

let blogPostResponse: PostResponse = reactive({
  currentPage: 1,
  hasNextPage: false,
  hasPrevPage: false,
  lastPage: 1,
  nextPage: 1,
  previousPage: 0,
  totalItems: 0,
  posts: []
});

const fetchBlogPosts = async (page: number = 1) => {
  loading.value = true;
  try {
    const {data} = await repositoryFactory.get('Posts').get(page);
    blogPostResponse = {...data};
  } catch (err: any) {
    console.log(err);
  }

  loading.value = false;
};

const loading = ref(true);
onMounted(async () => {
  await fetchBlogPosts();
});

/*
  Modal
*/

const idToDelete = ref('');
const modalVisible = ref(false);

const deleteClickHandler = (id: string) => {
  modalVisible.value = true;
  idToDelete.value = id;
};

const deleteClicked = async () => {
  try {
    const {data} = await repositoryFactory.get('Posts').delete(idToDelete.value);
    if (data.status === 200) {
      modalVisible.value = false;
      idToDelete.value = '';
      await fetchBlogPosts();
    }
  } catch (err: any) {
    console.log(err);
  }
};

/*
  Pagination logic
*/

const pageChangeHandler = async (page: number) => {
  await fetchBlogPosts(page);
}

</script>
