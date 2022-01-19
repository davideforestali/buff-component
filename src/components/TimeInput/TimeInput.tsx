import React, { useState } from 'react'
import { isValidTimeInput } from '../../helpers'
// https://codespots.com/library/item/3101

interface TimeInputProps {
  initTime: string,
  onTimeChange: (val: string) => void
}

const TimeInput: React.FC<TimeInputProps> = ({ initTime, onTimeChange }) => {
  const [time, setTime] = useState(initTime)
  let lastVal = ''

  const onChangeHandler = (val: string) => {
    if (val === time) {
      return
    }

    if (isValidTimeInput(val)) {
      if (val.length === 2 && lastVal.length !== 3 && val.indexOf(':') === -1) {
        val = val + ':'
      }

      if (val.length === 2 && lastVal.length === 3) {
        val = val.slice(0, 1)
      }

      if (val.length > 5) {
        return false
      }

      lastVal = val
      setTime(val)
      onTimeChange(val)
    }
  }

  return (
    <input
      className='timer-input'
      type='tel'
      value={time}
      placeholder='mm:ss'
      onChange={(e) => onChangeHandler(e.target.value)}
    />
  )
}

export default TimeInput