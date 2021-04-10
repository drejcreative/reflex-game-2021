import { useState, useEffect } from 'react';

import { mapLetterList } from "../../services/mapNumberToLetter";

import styles from './GameNumbers.module.scss';

const GameNumbers = ({ result }) => {
  const [list, setlist] = useState([]);

  useEffect(() => {
    setlist(mapLetterList());
  }, []);

  useEffect(() => {
    if (list.length && result) {
      const updatedlist = list.map(one => one.key === result.key ? { ...one, hit: result.hit } : one);
      setlist(updatedlist);
    }
  }, [result]);


  return (
    <div className={styles.gamenumbers}>
      {
        list.map(one => (
          <p
            key={one.key}
            className={`${one.hit === 'true' ? styles.hit : ''} ${one.hit === 'false' ? styles.miss : ''}`}
          >
            {one.value}
          </p>
        ))
      }
    </div>
  )
}

export default GameNumbers;