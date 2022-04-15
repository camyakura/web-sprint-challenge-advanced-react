// Write your tests here
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional'
 
let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}


beforeEach(() => {
  render(<AppFunctional />)
  updateStatelessSelectors(document)
  updateStatefulSelectors(document)
})

afterEach(() => {
  window.localStorage.clear()
})

describe('Testing App Functional Component',() => {

  test('renders without errors',() => {

  })

  test('Renders in DOM',() => {
    expect(left).toBeInTheDocument()
    expect(right).toBeInTheDocument()
    expect(up).toBeInTheDocument()
    expect(down).toBeInTheDocument()
    expect(reset).toBeInTheDocument()
  })

  test('renders error email', () => {
    fireEvent.click(submit)
    expect(message).toBeInTheDocument()
  })

  test('renders email winner name', () => {

    fireEvent.change(email, {target:{value: 'cyakura@gmail.com'}})
    fireEvent.click(submit)
    
    expect(message).toBeInTheDocument()
  })
  test('renders coordinates and steps',() => {
    expect(steps).toBeInTheDocument()
    expect(coordinates).toBeInTheDocument()
  })
})