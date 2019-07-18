<template>
  <div class="flex flew-row justify-around items-end h-64">
    <div
      v-for="day in analysis.days"
      :key="day.day"
      class="relative flex-1 flex flex-col justify-center items-center"
    >
      <div v-if="day.tomato > 0" class="text-primary text-sm font-black">
        {{ day.tomato }}
      </div>
      <div
        v-for="n in day.tomato"
        :key="`${day.day}_${n}`"
        class="mt-1/2 w-6 h-2 bg-primary rounded-lg"
      ></div>

      <div class="absolute -bottom-2 flex flex-col justify-center items-center">
        <div class="text-2xs font-black leading-none mb-1/2">
          {{ day.day }}
        </div>
        <div class="text-2xs font-black text-muted leading-none">
          {{ day.dayOfWeek }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chart',

  props: {
    analysis: Object,
  },
}
</script>

<style lang="stylus" scoped></style>
