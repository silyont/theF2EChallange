<template>
  <span
    class="icon-button relative bg-white cursor-pointer rounded-full text-muted flex justify-center items-center"
    :style="buttonStyle"
    :class="{ 'pointer-events-none': active }"
  >
    <icon-svg :icon="icon" :class="{ [iconColor]: active }"></icon-svg>

    <span
      class="hover-text absolute w-full h-full rounded-full flex items-center justify-center"
    >
      <span class="font-black text-2xs" :class="[iconColor]">{{
        hoverText
      }}</span>
    </span>
  </span>
</template>

<script>
import IconSvg from './IconSvg'

export default {
  name: 'IconButton',

  components: {
    IconSvg,
  },

  props: {
    size: Number,
    icon: String,
    active: Boolean,
    iconColor: {
      type: String,
      default: 'text-primary',
    },
    hoverText: String,
  },

  computed: {
    buttonStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
      }
    },
  },
}
</script>

<style scoped>
.icon-button:hover .hover-text {
  visibility: visible;
}

.hover-text {
  visibility: hidden;
  background-color: rgba(252, 252, 252, 0.7);
}
</style>
