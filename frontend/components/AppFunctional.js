import React, { useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'

const initialValues = {
  x: 2,
  y: 2,
  steps: 0,
  email: '',
  grid: [
    [ 1, 1, false, null],
    [ 2, 1, false, null],
    [ 3, 1, false, null],
    [ 1, 2, false, null],
    [ 2, 2, false, 'B'],
    [ 3, 2, false, null],
    [ 1, 3, false, null],
    [ 2, 3, false, null],
    [ 3, 3, false, null],
  ],
  message: '',
}

export default function AppFunctional(props) {
  const [x, setX] = useState(initialValues.x)
  const [y, setY] = useState(initialValues.y)
  const [steps, setSteps] = useState(initialValues.steps)
  const [email, setEmail] = useState(initialValues.email)
  const [message, setMessage] = useState(initialValues.message)
  const [grid, setGrid] = useState(initialValues.grid)

  const moveLeft = () => {
    if(x > 1){
      setX(x - 1)
      setSteps(steps + 1)
      setMessage('')
    } else {
      setMessage("You can't go left")
    }
  }

  const setLocation = () => {
    grid.map(array => {
      if(array[0] === x && array[1] === y){
        array[2] = true
        array[3] ='B'
      } else {
        array[2] = false
        array[3] = null
      }
    })
  }

  setLocation()

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          grid.map((array, idx) => {
            if(array[2] === true){
              return ( <div className='square active' key={idx}>{array[3]}</div>)
            } else {
              return ( <div className='square' key={idx}>{array[3]}</div>)
            }
          })
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={moveLeft}>LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
