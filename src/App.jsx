import { useState, useRef, useEffect } from 'react'
import Dice from "./Dice.jsx"
import './App.css'
import { nanoid } from 'nanoid'
import  Confetti  from 'react-confetti'

function App() {
  const [dice, setDice] = useState(() => generateDice())
  const buttonRef = useRef(null)

  const gameWon = dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
        buttonRef.current.focus()
    }
}, [gameWon])

  function generateDice() {
    return new Array (5)
    .fill(0)
    .map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }))
  }

  function rollDice() {
    setDice(oldDice => {
      return oldDice.map(dice => {
        return dice.isHeld ?
          dice : 
          {...dice, value: Math.ceil(Math.random() * 6)}
      })
    })
  }

  function hold(id) {
    setDice(oldDice => {
      return oldDice.map(dice => {
        return dice.id === id ?
          {...dice, isHeld: !dice.isHeld} :
          dice
      })
    })
  }


  const DiceElements = dice.map(diceObj => <Dice 
    hold={hold}
    key={diceObj.id} 
    value={diceObj.value} 
    isHeld={diceObj.isHeld} 
    id={diceObj.id}
    />)

  return (
    <>
      {gameWon ? <Confetti /> : null}
      <h1>{gameWon? "YOU GOT YATZY!!!" : "Play Yatzy"}</h1>
      <p> {gameWon? "Wanna play again? ":"Click on the dice to hold them, click the button reroll."}</p>
      <div className="dice-container">
        {DiceElements}
      </div>
      {gameWon ? <button ref={buttonRef} className="roll-dice" onClick={() => {setDice(generateDice())}}>
         New game
        </button> :
        <button className="roll-dice" onClick={rollDice}>Roll Dice</button>}
    </>
  )
}

export default App
  