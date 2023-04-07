import React, {useState, useEffect} from 'react'
import './index.css'
import {Schedule} from './Schedule.js'
import {Taskbar} from './Taskbar.js'

export function Day(props) {

    const [display, setDisplay] = useState(props.display);
    const [data, setData] = useState(props.data);
    const [isDustbin, toggleDustbin] = useState(false)
    const dayChart = [['Sunday', 'Sun'], ['Monday', 'Mon'], ['Tuesday', 'Tue'], ['Wednesday', 'Wed'], ['Thursday', 'Thu'], ['Friday', 'Fri'], ['Saturday', 'Sat']]
    const monthChart = [['January', 'Jan'], ['Febuary', 'Feb'], ['March', 'Mar'], ['April', 'Apr'], ['May', 'May'], ['June', 'Jun'], ['July', 'Jul'], ['August', 'Aug'], ['Setpember', 'Sep'], ['October', 'Oct'], ['November', 'Nov'], ['December', 'Dec']]
    const suffix = (date = props.dateId.getDate()) => {
        let split = (date+'').split('')
        let id = split[split.length-1]
        switch(id) {
            case '1':
                return 'st'
            case '2':
                return 'nd'
            case '3':
                return 'rd'
            default:
                return 'th'
        }
    }

    useEffect(()=>{

    return (()=>{
        if (props.passToMonth != undefined) {
            props.passToMonth(props.dateId.getDate(), data)
        console.log('Day passing ', data, 'to updateMonthData. index: ', props.dateId.getDate())
        }
        
    })

    }, [])

    function updateDayData(type, newData) {
        setData((prevData)=>{
            prevData[type] = newData
            return prevData
        })
    }

    if (display) {
        return(
            <div className='dayCard' >
                <div onClick={(event)=>{props.focusDay(props.dateId)}} >{dayChart[props.dateId.getDay()][1]}<br></br>{props.dateId.getDate()} </div>
            </div>
        )
    } else {
        return(
            <div id={props.dateId+'Day'} className='Day'>
                <div id={props.dateId+'revealer'} className='revealer' style={{position: 'relative'}}>
                    <div className='dayTitle'>{dayChart[props.dateId.getDay()][0]+', '+monthChart[props.dateId.getMonth()][0]+' '+props.dateId.getDate()+suffix()}</div>
                    <div className='backButton flexCenter' style={{color: 'var(--darkGreen)'}} onClick={()=>{props.resetMonth()}}></div>
                    <Schedule data={data.Schedule} passToDay={updateDayData}/>
                </div>

                <Taskbar when={dayChart[props.dateId.getDay()][0]} data={data.Taskbar} passToParent={updateDayData} />
                
            </div>
        )
    }
    
}