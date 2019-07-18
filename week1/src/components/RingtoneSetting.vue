<template>
  <div>
    <h1 class="font-black text-xl tracking-widest">RING TONE</h1>

    <hr class="border-top border border-gray my-6" />

    <tabs>
      <tab title="WORK">
        <div>
          <div
            v-for="ringTone in ringTones"
            :key="`work_${ringTone}`"
            class="item"
          >
            <span class="flex justify-center items-center">
              <div
                class="h-4 w-4 border-primary border-2 rounded-full mr-4 transition cursor-pointer"
                :class="{ 'bg-primary': ringTone === workRingTone }"
                @click.self="workRingTone = ringTone"
              ></div>
              {{ ringTone }}
            </span>

            <circular-progress :size="20" class="cursor-pointer">
              <span
                class="absolute bg-gray rounded-full flex items-center justify-center"
                style="width: 16px;height: 16px;"
              >
                <i class="material-icons text-sm">play_arrow</i>
              </span>
            </circular-progress>
          </div>
        </div>
      </tab>
      <tab title="BREAK">
        <div
          v-for="ringTone in ringTones"
          :key="`break_${ringTone}`"
          class="item"
        >
          <span class="flex justify-center items-center">
            <div
              class="h-4 w-4 border-primary border-2 rounded-full mr-4 transition cursor-pointer"
              :class="{ 'bg-primary': ringTone === breakRingTone }"
              @click.self="breakRingTone = ringTone"
            ></div>
            {{ ringTone }}
          </span>

          <circular-progress :size="20" class="cursor-pointer">
            <span
              class="absolute bg-gray rounded-full flex items-center justify-center"
              style="width: 16px;height: 16px;"
            >
              <icon class="material-icons text-sm">play_arrow</icon>
            </span>
          </circular-progress>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-slim-tabs'
import CircularProgress from './CircularProgress'

export default {
  name: 'RingtoneSetting',

  components: {
    CircularProgress,
    Tabs,
    Tab,
  },

  data() {
    return {
      ringTones: [
        'Ring tone 1',
        'Ring tone 2',
        'Ring tone 3',
        'Ring tone 4',
        'Ring tone 5',
      ],

      workRingTone: 'Ring tone 1',
      breakRingTone: 'Ring tone 4',
    }
  },
}
</script>
