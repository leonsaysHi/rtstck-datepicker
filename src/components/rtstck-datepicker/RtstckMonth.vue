<template>
  <div class="month-grid">
    <div class="week-days">
      <div v-for="weekDay in daysOfWeek" :key="weekDay"><small class="font-weight-bold">{{weekDay}}</small></div>
    </div>
    <div class="calendar" :class="{ '-busy': isBusy }">
      <div class="busy"><b-spinner variant="primary" small data-html2canvas-ignore="true" /></div>
      <div v-for="(weekDays, weekIdx) in calendarByWeeks" :key="weekIdx">
        <RtstckDay
          v-for="(day, dayIdx) in weekDays"
          :key="dayIdx"
          :moment="day"
          :currentMonth="currentMonth"
          :selectedDays="selectedDays"
          @on-select="handleSelect"
        >
          <template v-slot:day="{moment, handleClick, isToday, isDayOfMonth, isSelected}">
            <slot name="day" :moment="moment" :handleClick="handleClick" :isToday="isToday" :isDayOfMonth="isDayOfMonth" :isSelected="isSelected"></slot>
          </template>
        </RtstckDay>
      </div>
    </div>
  </div>
</template>

<script>
import RtstckDay from './RtstckDay.vue';
export default {
  components: { RtstckDay },
  inject: ['locale'],
  props: {
    gridDays: { required: true },
    currentMonth: { required: true },
    selectedDays: { type: Array, default: () => [] },
    isBusy: { default: false, }
  },
  data () {
    return {
    }
  },
  computed: {
    daysOfWeek() {
      return this.locale.daysOfWeek
    },
    calendarByWeeks() {
      return _.chunk(this.gridDays, 7)
    },
  },
  methods: {
    handleSelect(moment) {
      this.$emit('on-select', moment)
    },
  },
};
</script>
<style lang="scss" scoped>
$border-color: hsl(0,0,90%);
.month-grid {
  min-width: 300px;

  .week-days, .calendar > div {
    display: flex;
    align-items: stretch;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      text-align: center;
    }
  }
  .calendar {
    position: relative;
    padding: 0 0 0 1px;
    .busy {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      overflow:hidden;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,.85);
      pointer-events: none;
      opacity: 0;
      transition: opacity .3s;
    }
    &.-busy .busy {
      opacity: 1;
      transition: none;
    }
    > div {
      > div {
        margin: -1px 0 0 -1px;
        border: solid 1px $border-color;
      }
    }
  }
}
</style>
