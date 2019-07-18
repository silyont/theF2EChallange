<template>
  <div>
    <h1 class="text-2xl font-bold tracking-wider mb-1">{{ task.title }}</h1>

    <div v-if="work" class="flex justify-center">
      <span
        v-for="n in task.estimatedTime"
        :key="`timer_${n}`"
        :class="{
          'mr-2': n < task.estimatedTime,
        }"
        class="rounded-full border-2 border-primary"
      >
        <circular-progress
          :size="10"
          offset-color-class="text-gray-light"
          :progress="getMiniProgress(n)"
        ></circular-progress>
      </span>
    </div>

    <span
      v-else
      class="bg-accent text-2xs text-white font-bold px-4 rounded-full tracking-wider"
    >
      BREAK
    </span>

    <circular-progress
      :stroke-color-class="work ? 'text-primary' : 'text-accent'"
      :progress="progress"
      class="my-12"
    >
      <div
        class="absolute font-bold text-4xl text-black tracking-widest flex bg-white justify-center items-center rounded-full"
        style="width: 200px; height: 200px"
      >
        {{ countDownText }}
      </div>
    </circular-progress>

    <div class="flex justify-between text-muted">
      <icon-button
        icon="play"
        :icon-color="work ? 'text-primary' : 'text-accent'"
        :size="50"
        hover-text="START"
        :active="started"
        @click.native="start"
      ></icon-button>

      <icon-button
        icon="pause"
        :icon-color="work ? 'text-primary' : 'text-accent'"
        :size="50"
        hover-text="PAUSE"
        @click.native="stopTimer"
      ></icon-button>

      <icon-button
        icon="reset"
        :icon-color="work ? 'text-primary' : 'text-accent'"
        :size="50"
        hover-text="RESET"
        @click.native="reset"
      ></icon-button>
    </div>

    <div
      class="cursor-pointer flex items-center justify-center text-sm font-bold tracking-wider mt-12"
      @click="complete"
    >
      <icon-svg icon="complete" class="mr-1"></icon-svg>
      TASK COMPLETE
    </div>
  </div>
</template>

<script>
import CircularProgress from './CircularProgress'
import IconButton from './IconButton'
import IconSvg from './IconSvg'

export default {
  name: 'Process',

  components: {
    IconSvg,
    IconButton,
    CircularProgress,
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      started: false,

      duration: 300,

      countDown: 300,

      timer: null,

      work: true, // true: work, false: rest

      progress: 0,
    }
  },

  computed: {
    countDownText() {
      const minutes = Math.floor(this.countDown / 60)
      const seconds = this.countDown % 60
      return `${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`
    },

    finished() {
      return (
        Math.ceil(this.task.consumedTime) === Math.ceil(this.task.estimatedTime)
      )
    },
  },

  watch: {
    countDown() {
      const progress = ((this.duration - this.countDown) / this.duration) * 100

      this.progress = this.work ? progress : 100 - progress

      if (this.work) {
        this.$store.commit('UPDATE_CONSUMED_TIME', {
          taskId: this.task.id,
          time: Math.floor(this.task.consumedTime) + progress / 100,
        })
      }
    },
  },

  methods: {
    pad(number, size) {
      let result = number + ''

      while (result.length < size) {
        result = '0' + result
      }
      return result
    },

    complete() {
      this.$store.commit('FINISH_TASK', this.task.id)

      alert(`Completed task ${this.task.title}`)

      this.work = true

      this.resetTimer()
    },

    start() {
      this.started = true

      if (!this.timer) {
        this.startTimer()
      }
    },

    finishOneLoop() {
      this.stopTimer()

      if (this.finished) {
        this.complete()

        return
      }

      this.work = !this.work

      this.resetTimer()
    },

    reset() {
      this.stopTimer()

      this.resetTimer()
    },

    startTimer() {
      this.timer = setInterval(() => {
        this.countDown--

        if (this.countDown <= 0) {
          this.finishOneLoop()
        }
      }, 30)
    },

    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)

        this.timer = null
      }

      this.started = false
    },

    resetTimer() {
      const t = this.work ? 300 : 30

      this.duration = t
      this.countDown = t
    },

    getMiniProgress(n) {
      if (n - 1 > this.task.consumedTime) {
        return 0
      }

      return Math.min((this.task.consumedTime - Math.max(n - 1, 0)) * 100, 100)
    },
  },

  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  },
}
</script>
