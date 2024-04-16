<template>
  <div :class="`card has-background-${bgColor}-dark p-4 mb-5`">

    <label
        v-if="label"
        class="label has-text-white">
      {{ label }}
    </label>
    <div class="field">
      <div class="control">
          <textarea
              :value="modelValue"
              @input="$emit('update:modelValue', $event.target.value)"
              class="textarea"
              :placeholder="placeholder"
              ref="textareaRef"
          />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'Add a new note'
  },
  label: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);


</script>