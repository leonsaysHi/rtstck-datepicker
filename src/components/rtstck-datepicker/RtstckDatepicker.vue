<template>
  <div class="rtstck-datepicker">
    <div v-if="monthNav" class="d-flex">
      <b-button variant="light" @click="handleSwitchMonth(-1)">&lt;</b-button>
      <div class="flex-grow-1 d-flex align-items-center justify-content-center font-weight-bold">{{ currentMonth | formatMonthName }}</div>
      <b-button variant="light" @click="handleSwitchMonth(1)">&gt;</b-button>
    </div>
    <RtstckMonth
      :gridDays="gridDays"
      :currentMonth="currentMonth"
      :selectedDays="selectedDays"
      class="mt-2"
      @on-select="handleSelect"
    >
      <template v-slot:day="{moment, handleClick, isToday, isDayOfMonth, isSelected}">
        <slot name="day" :moment="moment" :handleClick="handleClick" :isToday="isToday" :isDayOfMonth="isDayOfMonth" :isSelected="isSelected"></slot>
      </template>
    </RtstckMonth>
  </div>
</template>

<script>
import RtstckMonth from "./RtstckMonth.vue";
import { localeData } from "./utils";
export default {
  components: {
    RtstckMonth,
  },
  provide: function() {
    return {
      locale: localeData({}),
    }
  },
  props: {
    value: { default: () => [] }, // Array
    monthNav: { default: true },
    currentMonth: { default: () => moment() },
  },
  data() {
    return {
    }
  },
  computed: {
    gridDays()  {
      let firstDay = this.currentMonth.clone().startOf('month').startOf('day').startOf('week')
      let lastDay = this.currentMonth.clone().endOf('month').startOf('day').endOf('week')
      let currentDay = firstDay.clone()
      let res = []
      while(moment(currentDay).isSameOrBefore(lastDay)) {
        const d = currentDay.clone()
        res.push(d)
        currentDay.add(1, 'day')
      }
      return res
    },
    selectedDays() {
      if (!this.value) { return [] }
      if (_.isArray(this.value)) { return this.value.slice().map(d => d.isMoment ? d : moment(d)) }
      return [ this.value.isMoment ? this.value : moment(this.value) ]
    },
  },
  methods: {
    handleSelect(moment) {
      const returnMoment = _.isArray(this.value) && this.value.length > 0 && this.value[0].isMoment
      this.$emit('input', returnMoment ? moment : moment.toDate())
      this.$emit('change', returnMoment ? moment : moment.toDate())
    },
    handleSwitchMonth(way=1) {
      this.currentMonth = way > 0 ? this.currentMonth.clone().add(1, 'month') : this.currentMonth.clone().subtract(1, 'month')
    }
  },
  filters: {
    formatMonthName(m) {
      return m.format("MMMM YYYY")
    }
  },
};
</script>
