<template>
  <div :class="{'-not-day-of-month': !isDayOfMonth, '-is-selected': isSelected, '-is-today': isToday}">
    <slot name="day" :moment="moment" :handleClick="handleClick" :isToday="isToday" :isDayOfMonth="isDayOfMonth" :isSelected="isSelected">
      <div
        class="flex-grow-1 p-2"
        @click="handleClick(moment)"
        >{{ moment | dayNum }}</div>
    </slot>
</div>
</template>

<script>
export default {
  props: {
    moment: { required: true, },
    currentMonth: { required: true, },
    selectedDays: { type: Array, default: () => [] }
  },
  data () {
    return {
    }
  },
  computed: {
    isDayOfMonth () {
      return this.currentMonth ? this.currentMonth.get("month") === this.moment.get("month") : null
    },
    isSelected () {
      if (!this.selectedDays || this.selectedDays.length === 0) return false // empty
      if (this.selectedDays.length === 1) return this.selectedDays[0].isSame(this.moment, 'day') // single
      return this.selectedDays[0].isSameOrBefore(this.moment, 'day') && this.selectedDays[1].isSameOrAfter(this.moment, 'day') // list
    },
    isToday () {
      return moment(new Date()).isSame(this.moment, 'day')
    }
  },
  methods: {
    handleClick(moment) {
      this.$emit('on-select', moment)
    },
  },
  filters: {
    dayNum (moment) {
      return moment.format("D")
    }
  }
};
</script>
