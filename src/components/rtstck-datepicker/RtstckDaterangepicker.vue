<template>
  <div class="rtstck-daterange">
    <div class="d-flex">
      <div class="flex-grow-1 pr-1">
        <div class="d-flex">
          <b-button variant="light" @click="handleSwitchMonth(-1)">&lt;</b-button>
          <div class="flex-grow-1 d-flex align-items-center justify-content-center font-weight-bold">{{ currentMonths[0] | formatMonthName }}</div>
        </div>
        <slot name="datepicker1" :currentMonth="currentMonths[0]" :monthNav="false" :value="value" :handleChange="handleNewDate">
          <RtstckDatepicker
            :currentMonth="currentMonths[1]"
            :monthNav="false"
            :value="value"
            @change="handleNewDate"
          />
        </slot>
      </div>
      <div class="pl-1 flex-grow-1">
        <div class="d-flex">
          <div class="flex-grow-1 d-flex align-items-center justify-content-center font-weight-bold">{{ currentMonths[1] | formatMonthName }}</div>
          <b-button variant="light" @click="handleSwitchMonth(1)">&gt;</b-button>
        </div>
        <slot name="datepicker2" :currentMonth="currentMonths[1]" :monthNav="false" :value="value" :handleChange="handleNewDate">
          <RtstckDatepicker
            :currentMonth="currentMonths[1]"
            :monthNav="false"
            :value="value"
            @change="handleNewDate"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import RtstckDatepicker from './RtstckDatepicker.vue';
export default {
  components: {
    RtstckDatepicker
  },
  props: {
    value: { default: () => [] }
  },
  data () {
    return {
      currentMonths: [moment(), moment().add(1, 'month') ],
    }
  },
  computed: {
    currentRange() {
      if (!this.value || !_.isArray(this.value)) return [] // unset
      if (this.value.length === 2) return this.value.slice()
      if (this.value.length === 1) return this.value[0]
      return this.value
    },
  },
  methods: {
    handleNewDate(value) {
      let v = _.isArray(this.value) ? this.value.slice().map(d => moment (d)) : []
      const m = moment(value)
      if (v.length === 1 && m.isAfter(v[0], 'day')) { v.push(m.endOf('day')) }
      else { v = [ m ] }
      this.$emit('input', v.map(d => d.toDate()))
      this.$emit('change', v.map(d => d.toDate()))
    },
    handleSwitchMonth(way=1) {
      const [ m0, m1 ] = this.currentMonths
      this.currentMonths = way > 0 ? [ m1, m1.clone().add(1, 'month') ] : [ m0.clone().subtract(1, 'month'), m0 ]
    }
  },
  filters: {
    formatMonthName(m) {
      return m.format("MMMM YYYY")
    }
  },
};
</script>
