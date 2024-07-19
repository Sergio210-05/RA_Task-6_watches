import React, { Component } from 'react'
import Clock from '../Clock/Clock'

type clockType = {title: string, timeZone: number, removed: boolean, currentTime?: number}

export default class AddForm extends Component {
  clockNameRef: React.RefObject<HTMLInputElement>
  clockZoneRef: React.RefObject<HTMLInputElement>
  state: {clocksAdded: clockType[]}

  constructor(props: {}) {
    super(props)
    this.clockNameRef = React.createRef()
    this.clockZoneRef = React.createRef()
    this.state = {
      clocksAdded: [{
        title: 'London',
        timeZone: 0,
        removed: false,
        currentTime: Date.now()
      }]
    }
  }

  handleClick = (): void => {
    const currentTime = Date.now()
    if (this.clockNameRef.current?.value) {
      const newClock = {
        title: this.clockNameRef.current?.value,
        timeZone: Number(this.clockZoneRef.current?.value) || 0,
        removed: false,
        currentTime: currentTime
      }
      const clocksAdded = this.state.clocksAdded
      clocksAdded.push(newClock)
      this.setState({clocksAdded: clocksAdded})
      this.clockNameRef.current.value = ''
      if (this.clockZoneRef.current?.value) {
        this.clockZoneRef.current.value = ''
      }
    }

  }

  removeClock = (clockTime: number | undefined): void => {
    this.setState({clocksAdded: this.state.clocksAdded.filter(clock => clock.currentTime != clockTime)})
  }

  render() {

    return (
      <>
        <div className='add-clock-form'>
          <div className='clock-title'>
            <div>Название</div>
            <input 
            type="text" 
            title='Название' 
            className='clock-title-input' 
            ref={this.clockNameRef} 
            placeholder='Введите название для часов'
            />
          </div>
          
          <div className='clock-timezone'>
            <div>Временная зона</div>
            <input 
            type="number" 
            title='Временная зона' 
            className='clock-timezone-input' 
            ref={this.clockZoneRef} 
            placeholder='Введите временную зону GMT+'
            />
          </div>

          <button className='add-clock-button' type='submit' onClick={this.handleClick}>Добавить</button>
        </div>
        <div className=' customer-clockscontainer'>
          {this.state.clocksAdded.map((clock) => {
            return(
              <Clock key={clock.currentTime}  
              removeHandler={() => this.removeClock(clock.currentTime)} 
              {...clock}/>
            )
          })}
        </div>
        
      </>
    )
  }
}
