<template>
  <div>
    <h1 class="font-black text-xl tracking-widest">ANALYTICS REPORT</h1>

    <hr class="border-top border border-gray my-6" />

    <span class="text-muted block mb-2 font-bold text-sm">
      TOMATO OF THIS WEEK
    </span>

    <div class="bg-info flex pt-3 pb-4">
      <div
        class="flex flex-1 flex-col justify-center text-center align-center border-r border-muted-dark"
      >
        <div class="text-5xl text-primary font-black leading-none">8</div>
        <div class="text-xs text-white font-black">TODAY</div>
      </div>
      <div class="flex flex-1 flex-col justify-center text-center align-center">
        <div class="text-5xl text-primary font-black leading-none">20</div>
        <div class="text-xs text-white font-black">07/08 - 07/14</div>
      </div>
    </div>

    <div class="mt-5 flex items-end mb-2">
      <span class="text-muted block font-bold text-sm mr-1">
        CHART
      </span>

      <span class="text-2xs text-white font-black">{{ selectedWeek }}</span>
    </div>

    <div class="bg-info mb-16">
      <transition name="fade" mode="out-in">
        <chart
          :key="selectedWeekAnalysis.week"
          :analysis="selectedWeekAnalysis"
        ></chart>
      </transition>
    </div>

    <div class="flex justify-between">
      <button
        class="border-2 rounded-full text-sm font-black py-2 px-8"
        :disabled="!hasPrevious"
        :class="[
          hasPrevious ? 'text-primary' : 'text-muted',
          hasPrevious ? 'border-primary' : 'border-muted',
        ]"
        @click="goPrevious"
      >
        PREV
      </button>
      <button
        class="border-2 text-primary border-primary rounded-full text-sm font-black py-2 px-8"
        :disabled="!hasNext"
        :class="[
          hasNext ? 'text-primary' : 'text-muted',
          hasNext ? 'border-primary' : 'border-muted',
        ]"
        @click="goNext"
      >
        NEXT
      </button>
    </div>
  </div>
</template>

<script>
import Chart from './Chart'

export default {
  name: 'TaskAnalysis',

  components: {
    Chart,
  },

  data() {
    return {
      selectedWeek: '07/08-07/14',

      analysis: [
        {
          week: '07/01-07/07',
          days: [
            {
              day: '07/01',
              dayOfWeek: 'MON',
              tomato: 12,
            },
            {
              day: '07/02',
              dayOfWeek: 'TUE',
              tomato: 8,
            },
            {
              day: '07/03',
              dayOfWeek: 'WED',
              tomato: 20,
            },
            {
              day: '07/04',
              dayOfWeek: 'THU',
              tomato: 3,
            },
            {
              day: '07/05',
              dayOfWeek: 'FRI',
              tomato: 17,
            },
            {
              day: '07/06',
              dayOfWeek: 'SAT',
              tomato: 3,
            },
            {
              day: '07/07',
              dayOfWeek: 'SUN',
              tomato: 2,
            },
          ],
        },
        {
          week: '07/08-07/14',
          days: [
            {
              day: '07/08',
              dayOfWeek: 'MON',
              tomato: 12,
            },
            {
              day: '07/09',
              dayOfWeek: 'TUE',
              tomato: 8,
            },
            {
              day: '07/10',
              dayOfWeek: 'WED',
              tomato: 0,
            },
            {
              day: '07/11',
              dayOfWeek: 'THU',
              tomato: 0,
            },
            {
              day: '07/12',
              dayOfWeek: 'FRI',
              tomato: 0,
            },
            {
              day: '07/13',
              dayOfWeek: 'SAT',
              tomato: 0,
            },
            {
              day: '07/14',
              dayOfWeek: 'SUN',
              tomato: 0,
            },
          ],
        },
      ],
    }
  },

  computed: {
    selectedWeekAnalysis() {
      return this.analysis.find(week => this.selectedWeek === week.week)
    },

    selectedWeekIndex() {
      return this.analysis.findIndex(week => this.selectedWeek === week.week)
    },

    hasNext() {
      return this.selectedWeekIndex < this.analysis.length - 1
    },

    hasPrevious() {
      return this.selectedWeekIndex > 0
    },
  },

  methods: {
    goNext() {
      if (this.hasNext) {
        this.selectedWeek = this.analysis[this.selectedWeekIndex + 1].week
      }
    },

    goPrevious() {
      if (this.hasPrevious) {
        this.selectedWeek = this.analysis[this.selectedWeekIndex - 1].week
      }
    },
  },
}
</script>
