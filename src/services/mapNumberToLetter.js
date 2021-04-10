export const LETTER_MAP = Object.freeze({
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26,
});

export const mapLetterList = (number) => {
  const result = []
  for (const [key, value] of Object.entries(LETTER_MAP)) {
    result.push({
      key: value,
      value: `${key} (${value})`
    })
  }
  return result;
}

export const mapLetterTonumber = (letter) => {
  const data = LETTER_MAP[letter.toUpperCase()]
  return data;
}