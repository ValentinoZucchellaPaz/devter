import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiff = timestamp => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit) {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo (timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiff(timestamp))
  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })

  if (timeago === undefined) {
    console.log('TIMEAGO UNDEFINED')
    return rtf.format(-5, 'seconds')
  }

  const { value, unit } = timeago

  useEffect(() => {
    if (unit !== 'day') {
      const currentUnit = DATE_UNITS.find(([unitString, _]) => unitString === unit)
      const multiplier = currentUnit[1] === 1 ? 15 : currentUnit[1]
      const interval = setInterval(() => {
        const newTimeago = getDateDiff(timestamp)
        setTimeago(newTimeago)
      }, (1000 * multiplier))
      return () => clearInterval(interval)
    }
  }, [timeago])

  if (value > 7 && unit === 'day') {
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  } else {
    return rtf.format(value, unit)
  }
}
