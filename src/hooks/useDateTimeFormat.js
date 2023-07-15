const isDateTimeFormatSupported = typeof Intl !== 'undefined' && Intl.DateTimeFormat

export const formatTime = (timestamp, { language = 'es-ES' } = {}) => {
  const date = new Date(timestamp)

  if (!isDateTimeFormatSupported) {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
    return date.toLocaleDateString(language, options)
  }

  const options = {
    year: 'numeric',
    month: 'numeric',
    week: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  return new Intl.DateTimeFormat(language, options).format(date)
}

export default function useDateTimeFormat (timestamp) {
  return formatTime(timestamp)
}
