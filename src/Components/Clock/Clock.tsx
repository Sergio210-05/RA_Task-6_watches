import React, { Component, useRef, useState } from 'react'

type TimeType = {
  currentTime: number
}

export default class Clock extends Component {
  clockName: string
  timeZone: number
  interval: undefined | number
  removeHandler: any

  constructor(props) {
    super(props)
    // console.log(props)
    this.clockName = props.title
    this.timeZone = props.timeZone
    this.removeHandler = props.removeHandler
    this.interval = undefined
    this.state = {
      currentTime: props.currentTime || Date.now(),
      close: false
    }
  }

  timeUpdate = () => {
    this.interval = setInterval(() => {
      // console.log(this.clockName)
      this.setState({
        currentTime: Date.now(),
        close: this.state.close
      })
    }, 1000)
  }

  componentDidMount(): void {
    this.timeUpdate()
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    
  }

  componentWillUnmount(): void {
    window.clearInterval(this.interval)
  }

  render() {
    let second = Math.floor(this.state.currentTime / 1000) % 60 * 6
    let minute = Math.floor(this.state.currentTime / 1000) / 60 % 60 * 6
    let hour = (Math.floor(this.state.currentTime / 1000) / 3600 + this.timeZone) % 24 % 12 * 30
    // console.log(this.state.currentTime / 3600 % 24 % 12 * 30)

    return (
      <>
        <div className='clock-container'>
          <div className='clock-name'>{this.clockName}</div>
          <div className='close'>
            <button type='button' className='close-button' onClick={this.removeHandler}>X</button>
          </div>
          <div className='clock-face'>
            <div className='second'>
              <div className='second-hand' style={{rotate: `${second}deg`}}></div>
            </div>
            <div className='minute'>
              <div className='minute-hand' style={{rotate: `${minute}deg`}}></div>
            </div>
            <div className='hour'>
              <div className='hour-hand' style={{rotate: `${hour}deg`}}></div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
