import React, { Component } from 'react'
import Clock from '../Clock/Clock'

export default class AddForm extends Component {
  clockNameRef: React.RefObject<HTMLInputElement>
  clockZoneRef: React.RefObject<HTMLInputElement>
  clocksAdded: Clock[]

  constructor(props) {
    super(props)
    this.clockNameRef = React.createRef()
    this.clockZoneRef = React.createRef()
    this.clocksAdded = []
    this.state = {
      clocksAdded: this.clocksAdded
    }
    // console.log(this.state)
  }

  handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    // event.preventDefault()
    if (this.clockNameRef.current?.value) {
      
      this.setState({clocksAdded: this.clocksAdded.push({
        title: this.clockNameRef.current?.value,
        timeZone: +this.clockZoneRef.current.value | 0
      })})
      console.log(this.state.clocksAdded)
    }

  }

  componentDidMount(): void {

  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    console.log('Update')
    // console.log(this.clockZoneRef.current?.value)
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
            // onSubmit={this.handleSubmit}
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
            // onSubmit={this.handleSubmit}
            defaultValue={3}/>
          </div>

          <button className='add-clock-button' type='submit' onClick={this.handleClick}>Добавить</button>
        </div>
        <div className='clock-element greenwich-clock'>
          {this.props.children}
        </div>
        <div className=' customer-clockscontainer'>
          {this.clocksAdded.map((clock, index) => {
            return(
              // <Clock {...clock} key={index}/>
              <Clock key={index} {...clock}/>
            )
          })}
        </div>
        
      </>
    )
  }
}
