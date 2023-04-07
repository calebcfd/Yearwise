import React, {useEffect, useState} from 'react'
import './index.css'
import {Day} from './Day.js'
import {Taskbar} from './Taskbar.js'

export function Month(props) {

    const [display, setDisplay] = useState(props.initialDisplay);
    const [present, setPresent] = useState(props.present);
    const [data, setData] = useState(props.data)

    
    const color = (props.dateId.getYear() == props.currentDate.getYear()) ? 'var(--primaryBlue)' : 'var(--primaryPurple)'

    const exampleCommentsActive = [
        {present: 'Active message 1', dateId: 'Thu Feb 16 2023 07:51:46 GMT-0500 (Eastern Standard Time)', check: true, index: 112, indexHolder: '01:12'},
        {present: 'Active message 2', dateId: 'Thu Feb 16 2023 07:51:47 GMT-0500 (Eastern Standard Time)', check: false, index: 112, indexHolder: '01:12'}, 
        {present: 'Active message 3', dateId: 'Thu Feb 16 2023 07:51:48 GMT-0500 (Eastern Standard Time)', check: true, index: 112, indexHolder: '01:12'}
    ]

    const exampleCommentsInactive = [
        {present: 'Inactive message 1', dateId: 'Thu Feb 16 2023 07:51:52 GMT-0500 (Eastern Standard Time)', check: true, index: 112, indexHolder: '01:12'},
        {present: 'Inactive message 2', dateId: 'Thu Feb 16 2023 07:51:53 GMT-0500 (Eastern Standard Time)', check: false, index: 112, indexHolder: '01:12'}, 
        {present: 'Inactive message 3', dateId: 'Thu Feb 16 2023 07:51:54 GMT-0500 (Eastern Standard Time)', check: true, index: 112, indexHolder: '01:12'}
    ]

    const exampleNumIndexActive = [
        {present: 'Active message 1', dateId: 'Thu Feb 16 2023 07:51:55 GMT-0500 (Eastern Standard Time)', check: true, index: 1, indexHolder: '1'},
        {present: 'Active message 2', dateId: 'Thu Feb 16 2023 07:51:56 GMT-0500 (Eastern Standard Time)', check: false, index: 2, indexHolder: '2'}, 
        {present: 'Active message 3', dateId: 'Thu Feb 16 2023 07:51:57 GMT-0500 (Eastern Standard Time)', check: true, index: 3, indexHolder: '3'}
    ]

    const exampleNumIndexInactive = [
        {present: 'Inactive message 1', dateId: 'Thu Feb 16 2023 07:51:49 GMT-0500 (Eastern Standard Time)', check: true, index: 1, indexHolder: '1'},
        {present: 'Inactive message 2', dateId: 'Thu Feb 16 2023 07:51:50 GMT-0500 (Eastern Standard Time)', check: false, index: 2, indexHolder: '2'}, 
        {present: 'Inactive message 3', dateId: 'Thu Feb 16 2023 07:51:51 GMT-0500 (Eastern Standard Time)', check: true, index: 3, indexHolder: '3'}
    ]

    const exampleEmpty = {Schedule: {active: [...exampleCommentsActive], inactive: [...exampleCommentsInactive]}, Taskbar: {active: [...exampleNumIndexActive], inactive: [...exampleNumIndexInactive]}}

    useEffect(()=>{
            return (()=>{
                if (props.passToYear != undefined) {
                    props.passToYear(props.dateId.getMonth(), data);
                console.log('Month passed ', data, 'to Year')
                }
            })
    }, [])

    function updateMonthData(index, newData) {
        setData((prevData)=>{
            prevData.days[index] = newData
            console.log('updateMonthData setting ', prevData.days[index], 'to ', newData)
            return prevData
        })
    }

    function daysInFeb() {
        return props.dateId.getYear() % 4 == 0 ? 29 : 28
    }

    const monthChart = [['January', 'Jan'], ['Febuary', 'Feb'], ['March', 'Mar'], ['April', 'Apr'], ['May', 'May'], ['June', 'Jun'], ['July', 'Jul'], ['August', 'Aug'], ['Setpember', 'Sep'], ['October', 'Oct'], ['November', 'Nov'], ['December', 'Dec']]
    const monthFetch = window.innerWidth < 768 ? monthChart[props.dateId.getMonth()][1] : monthChart[props.dateId.getMonth()][0]
    const short = [8, 3, 5, 10]
    const numDays = short.includes(props.dateId.getMonth()) ? 30 : props.dateId.getMonth() == 1 ? daysInFeb() : 31
    const days = []
    const spaceBefore = []
    const spaceAfter = []
    const spacer = (val)=> <div className='spacer' key={val} style={{flexBasis: '13%', height: '10vh', margin: '1vh 0'}}></div>

    for (let i = 1; i <= numDays; i++) {
        days.push( new Date(props.dateId.getFullYear(), props.dateId.getMonth(), i))
    }

    for (let i = 0; i < days[0].getDay(); i++) {
        spaceBefore.push(spacer(i))
    }

    for (let i = 0; i < 6 - days[days.length-1].getDay(); i++) {
        spaceAfter.push(spacer(i))
    }

    function resetMonth() {
        setDisplay(false)
        setPresent(null)
    }


    if (present != null) {

        return(
            <div className='Month'>
                <Day dateId={present} key={present} display={false}  data={data.days[present.getDate()] != undefined ? data.days[present.getDate()] : exampleEmpty} passToMonth={updateMonthData} resetMonth={resetMonth} />
            </div>
        )

    } else if(display) {
        return(
            <div id={props.dateId+'monthCard'} className='monthCard flexCenter col-4 col-md-2' onClick={()=>{props.toggleFocus(props.dateId)}} style={{backgroundColor: color}} >
                <div id={props.dateId+'consealer'} style={{transition: '.15s linear'}}>
                    {monthFetch}
                </div>
            </div>
        )
    } else {
        return(
            <div id={props.dateId+'Month'} className='Month' >

                <div id={props.dateId+'revealer'} style={{position: 'relative'}}>

                    <div className='monthTitle'>{monthChart[props.dateId.getMonth()][0]}</div>

                    <div className='backButton flexCenter' style={{color: 'var(--darkBlue)'}} onClick={()=>{props.resetYear()}}></div>

                    <div className='flexCenter'>
                        <div id={props.dateId+'dayCollector'} className='dayCollector'>
                            {spaceBefore.map(item=>item)}
                            {days.map(item=><Day dateId={item} key={item} focusDay={(dateId)=>setPresent(dateId)} display={true}/>)}
                            {spaceAfter.map(item=>item)}
                        </div>
                    </div>

                </div>

                <Taskbar data={data.Taskbar} when={monthChart[props.dateId.getMonth()][0] } passToParent={updateMonthData}/>
            
            </div>
            
        )
    }
}