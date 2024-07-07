import React, { Component } from 'react'
import Clock from '../Clock/Clock'

type clockType = {title: string, timeZone: number, removed: boolean, currentTime?: number}

export default class AddForm extends Component {
  clockNameRef: React.RefObject<HTMLInputElement>
  clockZoneRef: React.RefObject<HTMLInputElement>
  clocksAdded: clockType[]
  clockRefs: []

  constructor(props) {
    super(props)
    this.clockNameRef = React.createRef()
    this.clockZoneRef = React.createRef()
    this.clocksAdded = []
    this.clockRefs = []
    this.state = {
      clocksAdded: this.clocksAdded
    }
  }

  handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    console.log(this.state.clocksAdded)
    const currentTime = Date.now()
    if (this.clockNameRef.current?.value) {
      this.clocksAdded.push({
        title: this.clockNameRef.current?.value,
        timeZone: +this.clockZoneRef.current.value || 0,
        removed: false,
        currentTime: currentTime
      })
      this.setState({clocksAdded: this.clocksAdded})
    }

  }

  removeClock(reference) {
    console.log(reference.current.props.currentTime)
    const index = this.clocksAdded.findIndex( element => {
      return(
        element.currentTime === reference.current.props.currentTime
      )
    })
    console.log(index)
    this.clocksAdded.splice(index, 1)
    console.log(this.state.clocksAdded)
    console.log(this.clocksAdded)
    this.setState({clocksAdded: this.clocksAdded})
    console.log(this.state.clocksAdded)
  }

  componentDidMount(): void {

  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    console.log('Update')
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
            defaultValue={'Moscow'}
            />
          </div>
          
          <div className='clock-timezone'>
            <div>Временная зона</div>
            <input 
            type="number" 
            title='Временная зона' 
            className='clock-timezone-input' 
            ref={this.clockZoneRef} 
            defaultValue={3}/>
          </div>

          <button className='add-clock-button' type='submit' onClick={this.handleClick}>Добавить</button>
        </div>
        <div className='clock-element greenwich-clock'>
          {this.props.children}
        </div>
        <div className=' customer-clockscontainer'>
          {this.state.clocksAdded.map((clock, index) => {
            console.log(this.state.clocksAdded)
            this.clockRefs.push(React.createRef())
            return(
              clock.removed ? '' : <Clock key={index}  
              removeHandler={() => this.removeClock(this.clockRefs[index])} 
              ref={this.clockRefs[index]} 
              {...clock}/>
            )
          })}
        </div>
        
      </>
    )
  }
}
