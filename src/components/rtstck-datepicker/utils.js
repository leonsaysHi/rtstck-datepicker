import moment from 'moment'
const localeData = (options) => {
  const default_locale = {
    format: moment.localeData().longDateFormat('L'),
    customRangeLabel: 'Custom Range',
    daysOfWeek: moment.weekdaysShort(true),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek()
  }

  return { ...default_locale, ...options }
}

export { localeData }
