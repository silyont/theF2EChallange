<template>
  <div>
    <h1 class="font-black text-xl tracking-widest">TASK LIST</h1>

    <hr class="border-top border border-gray my-6" />

    <tabs>
      <tab title="TO DO">
        <div v-if="todoTasks.length === 0" class="item">
          You don't have any task yet, please go add some
        </div>
        <div v-else>
          <div
            v-for="(todoTask, index) in todoTasks"
            :key="`todo_${todoTask.id}`"
            class="item collapse"
          >
            <span class="flex items-center">
              <podomoro
                :size="13"
                class="mr-4"
                :class="{ 'opacity-0': index !== 0 }"
              ></podomoro>
              <span class="leading-tight">
                <div>{{ todoTask.title }}</div>
                <div class="flex my-1">
                  <span
                    v-for="n in todoTask.estimatedTime"
                    :key="`timer_${n}`"
                    :class="{
                      'mr-3/2': n < todoTask.estimatedTime,
                    }"
                    class="rounded-full border border-primary"
                  >
                    <circular-progress
                      :size="8"
                      offset-color-class="text-gray"
                      :progress="getMiniProgress(todoTask, n)"
                    ></circular-progress>
                  </span>
                </div>
              </span>
            </span>

            <span class="flex items-center justify-center">
              <i class="material-icons text-muted fill-current">more_horiz</i>
            </span>
          </div>
        </div>
      </tab>
      <tab title="DONE">
        <div v-if="doneTasks.length === 0" class="item">
          You don't have any finished task yet, please do some
        </div>
        <div v-else>
          <div
            v-for="doneTask in doneTasks"
            :key="`done_${doneTask.id}`"
            class="item collapse"
          >
            <span class="flex items-center">
              <i
                class="text-xs font-bold material-icons mr-4 border-2 border-white rounded-full p-1/2"
                >check</i
              >
              <span class="leading-tight">
                <div>{{ doneTask.title }}</div>
                <div class="flex my-1">
                  <span
                    v-for="n in doneTask.estimatedTime"
                    :key="`timer_${n}`"
                    :class="{
                      'mr-3/2': n < doneTask.estimatedTime,
                    }"
                    class="rounded-full border border-primary"
                  >
                    <circular-progress
                      :size="8"
                      offset-color-class="text-gray"
                      :progress="getMiniProgress(doneTask, n)"
                    ></circular-progress>
                  </span>
                </div>
              </span>
            </span>

            <span class="flex items-center justify-center">
              <i class="material-icons text-muted">more_horiz</i>
            </span>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import Podomoro from './Podomoro'
import CircularProgress from './CircularProgress'

import { Tabs, Tab } from 'vue-slim-tabs'

import { mapGetters } from 'vuex'

export default {
  name: 'TaskList',

  components: {
    Podomoro,
    CircularProgress,
    Tabs,
    Tab,
  },

  computed: {
    ...mapGetters(['todoTasks', 'doneTasks']),
  },

  methods: {
    getMiniProgress(task, n) {
      if (n - 1 > task.consumedTime) {
        return 0
      }

      return Math.min((task.consumedTime - Math.max(n - 1, 0)) * 100, 100)
    },
  },
}
</script>

<style>
.vue-tablist {
  @apply .flex;
}

.vue-tab {
  @apply .bg-muted-dark .text-muted .text-xs .font-black .tracking-wide .mr-2 .px-5 .py-1 .rounded-t-lg .cursor-pointer;
  transition: all 0.3s ease;
}

.vue-tab[aria-selected='true'] {
  @apply .bg-primary .text-white;
}
</style>
