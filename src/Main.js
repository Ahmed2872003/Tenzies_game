import React, { useEffect, useState } from "react";
import random from "./RandomNum";
import { nanoid } from "nanoid";
import Die from "./die.js";
import Confetti from "react-confetti";
export default function Main() {
  /*Use state to handle dice changes */
  const [dice, setDice] = useState(() => makeDice());
  /*Use state to handle dice changes */
  /*game status */
  const [gameEnded, setGame] = useState(false);
  const [gameStatus, setGameStatus] = useState("in processing");
  /*game status */
  /* Create Dice info function*/
  function makeDice() {
    let dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push({
        id: nanoid(),
        num: random(6),
        selected: false,
      });
    }
    return dice;
  }
  /* Create Dice info function*/

  /* Change each die to selected */
  function makeSelect(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, selected: !die.selected } : die
      )
    );
  }
  /* Change each die to selected */

  /* get Random Values */
  function changeValues() {
    if (!gameEnded) {
      setDice((prevDice) =>
        prevDice.map((die) => ({
          ...die,
          num: die.selected ? die.num : random(6),
        }))
      );
    } else {
      setDice(makeDice());
      setGame(false);
      setGameStatus("in processing");
    }
  }
  /* get Random Values */

  /*determine if the game ended or not*/
  useEffect(() => {
    const allSelected = dice.every((die) => die.selected);
    if (allSelected) {
      setGame((prevData) => !prevData);
      const firstDieVal = dice[0].num;
      const allTheSameVal = dice.every((die) => die.num === firstDieVal);
      if (allTheSameVal) setGameStatus("win");
      else setGameStatus("lose");
    }
  }, [dice]);

  /*determine if the game ended or not*/

  /* build diceBoxes */
  const diceBoxses = dice.map((die) => (
    <Die
      selected={die.selected}
      value={die.num}
      makeSelect={() => makeSelect(die.id)}
    />
  ));
  /* build diceBoxes */
  return (
    <main>
      {gameStatus === "win" && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h2>Tenzies</h2>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--con">{diceBoxses}</div>
      <button onClick={changeValues}>{gameEnded ? "New game" : "Roll"}</button>
      {gameStatus === "lose" && <p className="lose_message">You Lose :&lt;</p>}
    </main>
  );
}
