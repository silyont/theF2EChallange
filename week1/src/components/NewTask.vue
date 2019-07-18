<template>
  <div>
    <h1 class="font-black text-xl tracking-widest">ADD NEW TASK</h1>

    <hr class="border-top border border-gray my-6" />

    <form @submit.prevent="submit">
      <label for="title" class="text-muted block mb-2">
        TASK TITLE
      </label>

      <input
        id="title"
        type="text"
        placeholder="Your task title"
        class="w-full text-black py-3 px-4 rounded mb-5"
        v-model.trim="task.title"
      />

      <span class="text-muted block mb-2">
        ESTIMATED TOMOTO
      </span>

      <div class="mb-12 flex justify-between">
        <podomoro
          v-for="n in 10"
          :key="`estimate_${n}`"
          :size="25"
          class="mr-3 cursor-pointer"
          :inactive="n > task.estimatedTime"
          @click.native="selectEstimatedTime(n)"
        ></podomoro>
      </div>

      <button
        type="submit"
        class="rounded-full bg-primary text-white w-full py-3 text-sm font-black tracking-widest"
      >
        ADD TASK
      </button>
    </form>
  </div>
</template>

<script>
import Podomoro from './Podomoro'

export default {
  name: 'NewTask',

  components: {
    Podomoro,
  },

  data() {
    return {
      task: {
        title: '',
        estimatedTime: 0,
      },
    }
  },

  methods: {
    selectEstimatedTime(time) {
      this.task.estimatedTime = time
    },

    submit() {
      if (this.task.title === '' || this.task.estimatedTime <= 0) {
        alert('Invalid input')
        return
      }

      this.$store.commit('ADD_TASK', JSON.parse(JSON.stringify(this.task)))

      // eslint-disable-next-line no-console
      console.log('Added task')

      // Reset form
      this.task.title = ''
      this.task.estimatedTime = 0
    },
  },
}
</script>
