const Landing = () => {
  return (
    <div>
      <Header />
      <button onClick={() => setDificulty('easy')} >Easy</button>
      <button onClick={() => setDificulty('medium')}>Medium</button>
      <button onClick={() => setDificulty('hard')}>Hard</button>

      <div>
        <button onClick={gameStart}>Start the game</button>
      </div>


      {!!numbers.length && numbers.map(one => <span>{one} | </span>)}

      {
        gameInProgress && <Input value={yourChoice} onChange={onInputChange} />
      }

      <GameNumbers results={results} />
    </div>
  )
}

export default landing;
