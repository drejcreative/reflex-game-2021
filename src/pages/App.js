import { useState, useEffect, useRef } from 'react';
import GameNumbers from '../components/GameNumbers/GameNumbers';
import Header from '../components/Header/Header';
import Input from '../components/Input/Input';
import { mapLetterTonumber } from '../services/mapNumberToLetter';
import { numberService } from '../services/numberService';

import styles from './app.module.scss';

const initialScore = {
  hit: null,
  miss: null,
  left: 26
}

const numbersCheck = [];

function App() {
  const [numbers, setNumbers] = useState([]);
  const [yourChoice, setYourChoice] = useState('');
  const [gameInProgress, setGameInProgress] = useState(false);
  const [duficulty, setDificulty] = useState(5000);
  const [results, setResults] = useState({});
  const [score, setScore] = useState(initialScore);
  const [gameDone, setGameDone] = useState(false);

  const interval = useRef(null);

  // Clear Interval when all nubers are used
  if (numbers.length === 26) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    // Clear Interval
    return () => {
      clearInterval(interval.current);
    }
  }, [])

  const handleKeyClick = (data) => {
    if (yourChoice) {
      return null;
    }
    setYourChoice(data);
    checkAnswerValidity(data)
    if (numbersCheck.length === 26) {
      setGameDone(true);
    }
  }

  const checkAnswerValidity = (answer) => {
    const answernumber = mapLetterTonumber(answer);

    if (answernumber === numbers[numbers.length - 1]) {
      setResults({
        key: answernumber,
        hit: 'true'
      });
      setScore(prev => ({ ...prev, hit: prev.hit + 1 }))
      return;
    }

    setResults({
      key: numbers[numbers.length - 1],
      hit: 'false'
    })
    setScore(prev => ({ ...prev, miss: prev.miss + 1 }))
  }


  const generateNumber = () => {
    const random = numberService(numbersCheck);
    if (random) {
      setNumbers(old => [...old, random]);
      numbersCheck.push(random);
      setScore(prev => ({ ...prev, left: prev.left - 1 }))
      setYourChoice('')
    }
  }

  const gameStart = () => {
    setGameInProgress(true);
    interval.current = setInterval(generateNumber, duficulty);
  }

  const gameStop = () => {
    setGameInProgress(false);
    clearInterval(interval.current);
    setYourChoice('');
    setScore(initialScore);
    setNumbers([]);
    setGameDone(false);
  }


  const onKeyPress = e => {
    if (!numbers.length) {
      return;
    }
    setYourChoice(e.key);
    handleKeyClick(e.key)
  }

  const checkFinalScore = () => {
    if (score.hit > score.miss) {
      return <h1 className={styles.win}>Congtarulation, you did GREAT!</h1>
    }
    return <h1 className={styles.fail}>More luck next time!</h1>
  }


  return (
    <div className={styles.app}>
      <Header progress={gameInProgress} />
      <div className={styles.wrap}>

        <div className={`${styles.controls} ${gameInProgress ? styles.progress : ''}`}>
          <span className={styles.button} onClick={gameInProgress ? gameStop : gameStart}>{gameInProgress ? 'Stop' : 'Start the game'}</span>
        </div>

        {
          gameInProgress && (
            <>
              {
                gameDone
                  ? checkFinalScore()
                  : (
                    <div className={styles.options}>
                      {
                        numbers.length
                          ? <h1>{numbers[numbers.length - 1]}</h1>
                          : <h2>Prepare your fingers ...</h2>
                      }

                      <Input value={yourChoice} onKeyPress={onKeyPress} onChange={f => f} name="myNumber" />
                    </div>
                  )
              }


              <GameNumbers result={results} />


              <div className={`${styles.score} ${gameDone ? styles.big : ''}`}>
                <h3>Score:</h3>
                <p className={score.hit > 0 ? styles.hit : ''} ><span>Hit:</span> {score.hit}</p>
                <p className={score.miss > 0 ? styles.miss : ''}><span>Miss:</span> {score.miss}</p>
                <p><span>Left:</span> {score.left}</p>
              </div>
            </>
          )
        }

        {
          !gameInProgress && (
            <div className={styles.dificulty}>
              <span onClick={() => setDificulty(5000)} className={duficulty === 5000 ? styles.active : ''} >Easy</span>
              <span onClick={() => setDificulty(3500)} className={duficulty === 3500 ? styles.active : ''}>Medium</span>
              <span onClick={() => setDificulty(2000)} className={duficulty === 2000 ? styles.active : ''}>Hard</span>
            </div>
          )
        }

      </div>
    </div>
  );
}

export default App;
