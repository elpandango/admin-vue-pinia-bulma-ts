<template>
  <div class="card mb-6">
    <div class="card-image">
      <figure class="image is-4by3">
        <img
            :src="props.imageUrl"
            class="post-image"
            alt="Placeholder image"
        />
      </figure>
    </div>

    <div class="card-content">
      <div class="media mb-1">
        <div class="media-content flexbox">
          <time>{{ formatedDate }}</time>
          <router-link
              :to="`edit-post/${props.id}`"
              class="button is-primary">Edit post
          </router-link>
        </div>
      </div>

      <h3 class="header-title">{{ props.title }}</h3>

      <div
          class="content"
          v-html="props.content">
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
  id: {
    type: String
  },
  creator: {
    type: Object
  },
  createdAt: {
    type: String
  }
});

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatedDate = computed(() => {
  const date = new Date(<any>props?.createdAt);
  const day = String(date.getDate()).padStart(2, "0");
  const monthIndex = date.getMonth();
  const monthName = months[monthIndex];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDate = `${day} ${monthName} ${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} / ${formattedTime}`;
});

</script>

<style scoped>
.header-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
}

.media-content.flexbox {
  align-items: center;
  justify-content: space-between;
  display: flex;
}

.post-image {
  object-fit: cover;
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
