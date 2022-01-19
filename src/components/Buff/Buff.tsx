
import { BuffDataProps } from '../../interfaces/shared'
import styles from './Buff.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useState } from 'react'

interface BuffProps {
  isActive: boolean,
  countdownDuration: number,
  buffData: BuffDataProps,
  onCloseSubmit: () => void
}

const Buff: React.FC<BuffProps> = ({isActive, countdownDuration, buffData, onCloseSubmit}) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null)
  const buffVisibilityModifier = isActive ? ` ${styles.show}` : ''

  const answerSubmitHandler = (id: number) => {
    setSelectedAnswerId(id)
    setTimeout(() => {
      onCloseSubmit()
      setSelectedAnswerId(null)
    }, 2000) // TODO cleanup timeout
  }

  const answersListToRender = buffData.answers.map((answer, i) => {
    let backgrundModifier
    
    if (selectedAnswerId === answer.id) {
      if (answer.correct) backgrundModifier = styles.correct
      else backgrundModifier = styles.incorrect
    }

    return (
      <li key={answer.id}>
        <span className={styles.questionIndex}>{i+1}</span>
        <button
          aria-label={'answer number ' + i+1}
          className={backgrundModifier}
          onClick={selectedAnswerId ? () => {} : () => answerSubmitHandler(answer.id)}
        >
          {answer.title}
        </button>
      </li>
    )
  })

  return (
    <div className={styles.Buff + buffVisibilityModifier}>

      <button className={styles.closeBtn} onClick={onCloseSubmit}>✕</button>

      <div className={styles.author}>
        <div className={styles.authorImageContainer}>
          <img src={buffData.author.photo[0]} alt={buffData.author.first_name + ' avatar'} />
        </div>
        <span>
          {buffData.author.first_name} {buffData.author.last_name}
        </span>
      </div>

      <div className={styles.questionContainer}>
        <p>{buffData.question}</p>
        <div className={styles.countdown}>
          <CountdownCircleTimer
            isPlaying={isActive}
            duration={countdownDuration}
            size={40}
            colors={['#004777', '#F7B801']}
            colorsTime={[countdownDuration, 0]}
            strokeWidth={3}
            rotation='clockwise'
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      </div>

      <ul className={styles.answersList}>
        {answersListToRender}
      </ul>
    </div>
  )
}

export default Buff