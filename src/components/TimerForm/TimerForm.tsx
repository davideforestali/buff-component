import { useState } from "react"
import TimeInput from "../TimeInput/TimeInput"
import styles from './TimerForm.module.css'

interface TimerFormProps {
  isActive: boolean,
  onTimeInputSubmit: (insertedTimeInSeconds: number) => void,
  buffStartingSecond: number
}

const TimerForm: React.FC<TimerFormProps> = ({
  isActive,
  onTimeInputSubmit,
  buffStartingSecond
}) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
  const [insertedTimeInSeconds, setInsertedTimeInSeconds] = useState(15)
  const initialTimeInputValue = '00:15'
  const visibilityModifier = isActive ? ` ${styles.show}` : ''

  const onTimeChangeHandler = (val: string) => {
    const [minutesStr, secondsStr] = val.split(':')
    const minutesToSeconds = Number(minutesStr) * 60
    const seconds = Number(secondsStr)
    const totalSeconds = minutesToSeconds + seconds

    const isValidRange = 
      val.length === 5 && totalSeconds >= 5 && totalSeconds <= 120

    if (isValidRange) {  
      setIsSubmitDisabled(false)
      setInsertedTimeInSeconds(totalSeconds)

    } else setIsSubmitDisabled(true)
  }

  return (
    <>
      <div
        className={styles.backdrop + visibilityModifier}
        aria-label='backdrop'
      />
      <div className={styles.TimerForm + visibilityModifier}>
        <h2 className={styles.title}>Select the length of the countdown</h2>
        <p>Select a minumum of 5 seconds and the maximum of 2 minutes</p>
        <TimeInput initTime={initialTimeInputValue} onTimeChange={onTimeChangeHandler} />
        <button
          disabled={isSubmitDisabled}
          type="button"
          className="btn btn-primary"
          onClick={() => onTimeInputSubmit(insertedTimeInSeconds)}
        >
          Ok
        </button>
        <p>Note: the Buff will pop up at second {buffStartingSecond}</p>
      </div>
    </>
  )
}

export default TimerForm