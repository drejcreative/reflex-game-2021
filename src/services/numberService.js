export const numberService = (numbers) => {
  if (numbers.length === 26) {
    return;
  }

  const number = Math.floor(Math.random() * 26) + 1;
  const unique = numbers.includes(number) ? numberService(numbers) : number;
  return unique;
}
