import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'

const initialState  = {
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

export default class AppClass extends React.Component {
  state = initialState

  moveLeft = () => {
    if(this.state.x > 1){
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: this.state.x - 1,
        message: ''
      })
    } else {
      this.setState({
        message: "You can't go left"
      })
    }
  }

  moveRight = () => {
    if(this.state.x < 3){
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: this.state.x + 1,
        message: ''
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go right"
      })
    }
  }

  moveUp = () => {
    if(this.state.y > 1){
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        y: this.state.y - 1,
        message: ''
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go up"
      })
    }
  }

  moveDown = () => {
    if(this.state.y < 3){
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        y: this.state.y + 1,
        message: ''
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go down"
      })
    }
  }
  
  setLocation = () => {
    this.state.grid.map(array => {
      if(array[0] === this.state.x && array[1] === this.state.y){
        array[2] = true
        array[3] = 'B'
      } else {
        array[2] = false
        array[3] = null
      }
    })
  }

  reset = () => {
    this.setState(initialState)
    this.setState({
      message: ''
    })
  }

  postEmail = () => {
    const { x, y, steps, email } = this.state
    axios.post(URL, { "x": x, "y": y, "steps": steps, "email": email })
      .then(res => {
        this.setState({
          ...this.state, 
          message: res.data.message,
          email: ''
        })
      })
      .catch(err => {
        this.setState({message: err.response.data.message})
      })
  }
  
  emailInputChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, email: value})
  }

  onEmailSubmit = evt => {
    evt.preventDefault()
    this.postEmail()
  }

  render() {
    const { className } = this.props
    const { x, y, steps, grid, message, email } = this.state
    this.setLocation()

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${x},${y})`}</h3>
          { steps === 1 ? <h3 id='steps'>You moved {steps} time</h3> : <h3 id='steps'>You moved {steps} times</h3>}
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
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.moveLeft}>LEFT</button>
          <button id="up" onClick={this.moveUp}>UP</button>
          <button id="right" onClick={this.moveRight}>RIGHT</button>
          <button id="down" onClick={this.moveDown}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.emailInputChange} value={email}></input>
          <input id="submit" type="submit" onClick={this.onEmailSubmit}></input>
        </form>
      </div>
    )
  }
}
