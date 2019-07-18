<template>
  <div
    class="rounded-full relative flex justify-center items-center"
    :class="[inactive ? 'bg-muted' : 'bg-primary']"
    :style="podomoroStyle"
  >
    <div class="absolute top-0 right-0">
      <div
        class="top-0 right-0 absolute rounded-full"
        :class="[inactive ? 'bg-gray-dark' : 'bg-leaf']"
        :style="leafStyle"
        style="transform: rotate(135deg);"
      ></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Podomoro',

  props: {
    inactive: Boolean,

    size: Number,
  },

  computed: {
    podomoroStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      }
    },

    leafStyle() {
      return {
        width: `${this.size / 4.5}px`,
        height: `${this.size / 6}px`,
        margin: `${this.size / 18}px`,
      }
    },
  },
}
</script>
