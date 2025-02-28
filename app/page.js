import TicTacToe from "./components/TicTacToe";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TicTacToe />
    </div>
  );
}
