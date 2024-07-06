import React, { Component, useRef, useState } from 'react'

type TimeType = {
  currentTime: number
}

export default class Clock extends Component {
  clockName: string
  timeZone: number
  interval: undefined | number

  constructor(props) {
    super(props)
    console.log(props)
    this.clockName = props.title
    this.timeZone = props.timeZone
    this.interval = undefined
    // this.close = false
    this.state = {
      currentTime: Math.floor(Date.now() / 1000),
      close: false
    }
    // this.state = this.state.bind(this)
    // console.log(Date())
    // console.log(this.state.currentTime % 60)
    // console.log( Math.floor(this.state.currentTime / 60) % 60 )
    // console.log( Math.floor(this.state.currentTime / 3600) % 24 % 12 )
  }

  timeUpdate = () => {
    this.interval = setInterval(() => {
      console.log(this.clockName)
      this.setState({
        currentTime: Math.floor(Date.now() / 1000),
        close: this.state.close
      })
    }, 1000)
  }

  closeClock = (event: React.FormEvent<HTMLButtonElement>) => {
    console.log(event)
    this.setState({
      currentTime: Math.floor(Date.now() / 1000),
      close: true
    })
    window.clearInterval(this.interval)
  }

  componentDidMount(): void {
    this.timeUpdate()
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    
  }

  componentWillUnmount(): void {
    // window.clearInterval(this.interval)
  }

  render() {
    let second = this.state.currentTime % 60 * 6
    let minute = this.state.currentTime / 60 % 60 * 6
    let hour = (this.state.currentTime / 3600 + this.timeZone) % 24 % 12 * 30
    // console.log(this.state.currentTime / 3600 % 24 % 12 * 30)

    return (
      <>
      { this.state.close ? '' : 
      <div className='clock-container'>
        <div className='clock-name'>{this.clockName}</div>
        <div className='close'>
          <button type='button' className='close-button' onClick={this.closeClock}>X</button>
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
  }
      </>
    )
  }
}
