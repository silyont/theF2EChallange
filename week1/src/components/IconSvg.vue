<template>
  <div v-html="iconContent"></div>
</template>

<script>
export default {
  name: 'IconSvg',

  props: {
    icon: String,
  },

  computed: {
    iconContent() {
      return require('../assets/icons/' + this.icon + '.svg')
    },
  },
}
</script>
