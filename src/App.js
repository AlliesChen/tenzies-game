import React from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHold = dice.every((die) => die.isHeld);
    const allEqualVal = dice.every((die) => die.value === dice[0].value);
    if (allHold && allEqualVal) {
      setTenzies(true);
      return 0;
    }
    setTenzies(false);
  }, [dice]);

  function newDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];
    while (newDice.length < 10) {
      newDice.push(newDie());
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice);
      return 0;
    }
    setDice((prevDice) => prevDice.map((die) => (die.isHeld ? die : newDie())));
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="app">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
