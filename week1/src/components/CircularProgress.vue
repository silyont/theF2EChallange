<template>
  <div
    class="relative circle-container"
    :style="basicStyle"
    :class="offsetColorClass"
  >
    <div
      class="absolute circle-first-progress progress"
      :style="firstProgressStyle"
      :class="strokeClass"
    ></div>

    <div
      v-show="progress > 50"
      class="absolute circle-second-progress progress"
      :style="secondProgressStyle"
      :class="strokeClass"
    ></div>

    <div
      v-if="progress <= 50"
      class="absolute circle-offset progress"
      :style="basicStyle"
      :class="offsetColorClass"
    ></div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CircularProgress',

  props: {
    strokeColorClass: {
      type: String,
      default: 'text-primary',
    },

    offsetColorClass: {
      type: String,
      default: 'text-muted',
    },

    progress: {
      type: Number,
      default: 0,
    },

    size: {
      type: Number,
      default: 300,
    },
  },

  computed: {
    basicStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderRadius: `${this.size / 2}px`,
        borderWidth: `${this.size / 2}px`,
      }
    },

    strokeClass() {
      return [this.strokeColorClass]
    },

    firstProgressStyle() {
      return {
        ...this.basicStyle,
        ...this.getCircleStyle(this.progress > 50 ? 50 : this.progress, -135),
      }
    },

    secondProgressStyle() {
      return {
        ...this.basicStyle,
        ...this.getCircleStyle(this.progress - 50, 45),
      }
    },
  },

  methods: {
    getCircleStyle(percent, baseDegrees) {
      const rotateBy = baseDegrees + percent * 3.6

      return {
        transform: `rotateZ(${rotateBy}deg)`,
      }
    },
  },
}
</script>

<style scoped>
.circle-container {
  border-color: currentColor;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress {
  transition: transform 0.3s ease;
}

.circle-first-progress {
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: currentColor;
  border-top-color: currentColor;
  transform: rotateZ(-135deg);
}

.circle-second-progress {
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: currentColor;
  border-top-color: currentColor;
  transform: rotateZ(45deg);
}

.circle-offset {
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: currentColor;
  border-top-color: currentColor;
  transform: rotateZ(-135deg);
}
</style>
