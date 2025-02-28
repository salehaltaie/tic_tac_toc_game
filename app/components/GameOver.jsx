function GameOver({ gameOverAndResetHidden }) {
  const { hidden, winner } = gameOverAndResetHidden;
  return (
    <div className={`game-over ${hidden === false ? "block" : ""}`}>
      <h1>{winner}</h1>
    </div>
  );
}
export default GameOver;
