import React from "react";
import data from "./Data";
import random from "./RandomNum";
export default function Main() {
  /*Defenation for our boxes data state*/
  const [boxesData, setData] = React.useState(() => data());
  /*Defenation for our boxes data state*/

  /*Defenation for our game state*/
  const [gameState, setGameState] = React.useState(() => ["processing"]);
  /*Defenation for our game state*/

  /*Build our numbers elements for our game*/
  const boxes = boxesData.map((boxdata) => (
    <p
      style={{
        backgroundColor: boxdata.selected
          ? boxdata.wrong
            ? "#ff0000"
            : "#5ce18e"
          : "white",
      }}
      key={boxdata.id}
      onClick={(e) => makeSelect(e, boxdata.id)}
    >
      {boxdata.num}
    </p>
  ));
  /*Build our numbers elements for our game*/

  /*on click for numbers elements event*/
  function makeSelect(event, boxId) {
    let wrongNum = false;
    if (!checkValues(extractNums(boxesData, +event.target.innerHTML)))
      wrongNum = true;
    if (!boxesData[boxId - 1].selected) {
      setData((prevData) =>
        prevData.map((prevBoxData) => {
          if (prevBoxData.id === boxId) {
            if (wrongNum) prevBoxData.wrong = true;
            prevBoxData.selected = true;
          }
          return prevBoxData;
        })
      );
    }
  }
  /*on click for numbers elements event*/

  /*game results*/
  React.useEffect(() => {
    const c = boxesData.every((box) => box.selected);
    const selectedNums = extractNums(boxesData);
    const allTheSame = checkValues(selectedNums);
    if (c && allTheSame) {
      setGameState(["end", "win"]);
      document.querySelector(".popUp").classList.add("show");
    } else {
      if (!allTheSame && selectedNums.length) {
        setGameState(["end", "lose"]);
        document.querySelector(".popUp").classList.add("show");
      }
    }
  }, [boxesData]);
  /*game results*/

  /*extract numbers from our selected objects*/
  function extractNums(BD, additionalNum = -1) {
    let selectedNums = [];
    let l = BD.length;
    for (let i = 0; i < l; i++)
      if (BD[i].selected) selectedNums.push(BD[i].num);
    if (additionalNum !== -1) selectedNums.push(additionalNum);
    return selectedNums;
  }
  /*extract numbers from our selected objects*/

  /*Check if all numbers are the same*/
  function checkValues(nums) {
    return Math.max(...nums) === Math.min(...nums) ? true : false;
  }
  /*Check if all numbers are the same*/

  /*determine what happen when we click the button in the game*/
  function gameDirection() {
    if (gameState.length === 1) {
      setData((prevData) =>
        prevData.map((prevBoxData) => {
          if (!prevBoxData.selected) prevBoxData.num = random(10);
          return prevBoxData;
        })
      );
    } else {
      document.querySelector(".popUp").classList.remove("show");
      setData(data());
      setTimeout(() => {
        setGameState(["processing"]);
      }, 300);
    }
  }
  /*determine what happen when we click the button in the game*/
  return (
    <main>
      <h2>Tenzies</h2>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="numbers--con">{boxes}</div>
      <button onClick={gameDirection}>
        {gameState[0] === "processing" ? "Roll" : "Reset"}
      </button>
      <div
        className="popUp"
        style={{
          backgroundColor: gameState[1] === "lose" ? "#ff0000" : "#5ce18e",
        }}
      >
        {gameState[0] === "end" && gameState[1] === "lose"
          ? "You Lose :("
          : "You Won! :)"}
      </div>
    </main>
  );
}
