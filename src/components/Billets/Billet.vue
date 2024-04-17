<template>
  <div class="card mb-6">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
            src="https://bulma.io/assets/images/placeholders/1280x960.png"
            alt="Placeholder image"
        />
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-content">
<!--          <p class="title is-4">{{props.creator?.name}}</p>-->
          <time>{{formatedDate}}</time>
        </div>
      </div>

      <h3 class="header-title">{{props.title}}</h3>

      <div class="content ">
        {{props.content}}
        <br />
      </div>
    </div>
  </div>
</template>

<script
    setup
    lang="ts">

import {computed} from "vue";

const props = defineProps({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  imageUrl: {
    type: String
  },
  creator: {
    type: Object
  },
  createdAt: {
    type: String
  }
});

const formatedDate = computed(() => {
  const date = new Date(<any>props?.createdAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDate = `${month}-${day}-${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} - ${formattedTime}`;
});

</script>

<style scoped>
.header-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
}

.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  word-break: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
