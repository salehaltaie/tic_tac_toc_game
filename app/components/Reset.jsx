function Reset({ gameOverAndResetHidden, reSet }) {
  const { hidden, winner } = gameOverAndResetHidden;
  return (
    <div
      className={`reset-button ${hidden === false ? "block" : ""}`}
      onClick={() => {
        reSet();
      }}
    >
      Reset
    </div>
  );
}
export default Reset;
