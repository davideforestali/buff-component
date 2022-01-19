export const isValidTimeInput = (val: string) => {
  const regexp = /^\d{0,2}?\:?\d{0,2}$/

  const [minutesStr, secondsStr] = val.split(':')

  if (!regexp.test(val)) {
      return false
  }

  const minutes = Number(minutesStr)
  const seconds = Number(secondsStr)

  const isValidMinutes = (minutes: number) => Number.isInteger(minutes) && minutes >= 0 && minutes <= 59 && Number(minutes.toString()[0]) <= 5
  const isValidseconds = (seconds: number) => (Number.isInteger(seconds) && minutes >= 0 && minutes <= 59) || Number.isNaN(seconds)

  if (!isValidMinutes(minutes) || !isValidseconds(seconds)) {
      return false
  }

  if (seconds < 10 && Number(secondsStr[0]) > 5) {
      return false
  }

  const valArr = val.indexOf(':') !== -1
      ? val.split(':')
      : [val]

  // check mm and ss
  if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 59)) {
      return false
  }

  if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
      return false
  }

  return true
}