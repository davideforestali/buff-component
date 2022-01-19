import { useEffect, useRef, useState } from 'react'
import Buff from './components/Buff/Buff'
import TimerForm from './components/TimerForm/TimerForm'
import styles from './App.module.css'
import { BuffDataProps } from './interfaces/shared'

const networkErrorMsg = 'The buff couldn\'t be fetched'

const App:React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isBuffActive, setIsBuffActive] = useState(false)
  const [countdownDuration, setCountdownDuration] = useState(0)
  const [couterTimeout, setCounterTimeout] = useState<NodeJS.Timer>()
  const [buffData, setBuffData] = useState<BuffDataProps | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const buffStartingSecond = 5
  let buffToRender = null

  useEffect(() => {
    fetch('http://demo8702738.mockable.io/2')
    .then(response => {
      if (!response.ok) {throw new Error (networkErrorMsg)}
      return response.json()
    })
    .then(data => setBuffData(data.data))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (isBuffActive) {
      setCounterTimeout(setTimeout(() => {
        setIsBuffActive(false)
      }, countdownDuration * 1000))
    } else if (couterTimeout) clearInterval(couterTimeout)
  }, [isBuffActive])

  const timeInputSubmitHandler = (insertedTimeInSeconds: number) => {
    const video = videoRef.current
    setCountdownDuration(insertedTimeInSeconds)

    if (video) {
      video.addEventListener('timeupdate', () => {
        const time = Math.floor(video.currentTime)

        if (time === buffStartingSecond) {
          setIsBuffActive(true)

        } else if (
          time <= buffStartingSecond || 
          time >= buffStartingSecond + insertedTimeInSeconds) {
            setIsBuffActive(false)
            setCountdownDuration(insertedTimeInSeconds)
        } 
      })

      video.play()
      setIsVideoPlaying(true)
    }
  }

  if (buffData) {
    buffToRender = (
      <Buff
        buffData={buffData}
        isActive={isBuffActive}
        countdownDuration={countdownDuration}
        onCloseSubmit={() => setIsBuffActive(false)}
      />
    )
  } 
  
  if (isBuffActive && !buffData) {
    buffToRender = <p role='alert' className={styles.networkErrorMsg}>{networkErrorMsg}</p>
  }

  return (
    <main>
      <section className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className={styles.PlayerContainer}>
          <video
            className={styles.video}
            ref={videoRef}
            controls
            src='https://buffup-public.s3.eu-west-2.amazonaws.com/video/Auto+Buff+Stevie+G.mp4'
          />
          {buffToRender}
        </div>
        <TimerForm
          isActive={!isVideoPlaying}
          onTimeInputSubmit={(time) => timeInputSubmitHandler(time)}
          buffStartingSecond={buffStartingSecond}
        />
      </section>
    </main>
  )
}

export default App
