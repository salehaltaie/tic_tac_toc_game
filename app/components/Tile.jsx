function Tile({ className, value, onClick, playerTurn }) {
  let hoverClass = null;
  if (value === null) {
    hoverClass = `${playerTurn.toLowerCase()}-hover`;
  }
  return (
    <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
      {value}
    </div>
  );
}
export default Tile;
