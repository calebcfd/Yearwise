import React, {setState} from 'react'
import './index.css'
import {Taskbar} from './Taskbar.js'
import {Month} from './Month.js'
import { getDefaultNormalizer } from '@testing-library/react'


export class Year extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            display: props.display,
            present: props.present,
            data: props.data,
            edgeCase: props.edgeCase
        }

        this.updateYearData = this.updateYearData.bind(this)
        this.resetYear = this.resetYear.bind(this)
        this.storageCallback = this.storageCallback.bind(this)

    }

    componentWillUnmount() {
        this.props.passToFolder(this.state.data)
    }

    componentDidUpdate(prevProps, prevState) {
        
        if (prevState.data != this.state.data) {
            localStorage.setItem('dataObject', this.state.data)
        }

    }

    storageCallback() {
        localStorage.setItem('dataObject', JSON.stringify(this.state.data))
    }

    updateYearData(index, newData, callback = this.storageCallback) {
        this.setState((prevState)=>{
            prevState.data.months[index] = newData
            return prevState
        })
        callback()
        
    }

    resetYear() {
        this.setState({display: true})
    }




    render() {
        
        let currentMonth = this.props.currentDate.getMonth()
        let currentYear = this.props.currentDate.getFullYear()
        let months = []

        for(let i = currentMonth; i < currentMonth+12; i++) {

            if(i > 12) {
                months.push(new Date(currentYear+1, i-12))
            } else {
                months.push(new Date(currentYear, i))
            }
        };
        



        if (this.state.display) {
            return(
                <div>
    
    
                    <div id='monthCollector'>
                        {months.map((item)=>{return <Month present={null} id={`${item}`} dateId={item} currentDate={this.props.currentDate} key={item.getMonth()} initialDisplay={true} toggleFocus={(dateId)=>{this.setState(prevState=>({display: !prevState.display, present: dateId}))}} />})}
                    </div>
    
    
                    <Taskbar when='Year' data={this.state.data.Taskbar} passToParent={this.updateYearData}/>
    
    
                </div>
            )
        } else {
            return(
                <div id='monthCollector'>
    
    
                    
                    <Month present={this.state.edgeCase} dateId={this.state.present} data={this.state.data.months[this.state.present.getMonth()]} currentDate={this.props.currentDate} key={this.state.present} initialDisplay={false} resetYear={this.resetYear} passToYear={this.updateYearData} />
                    
    
    
                </div>
            )
        }

        
    }
}