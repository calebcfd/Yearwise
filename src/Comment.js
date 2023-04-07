import React, { useState, useEffect } from 'react'
import './index.css'


export function Comment(props) {

    const [display, setDisplay] = useState(true);
    const [present, setPresent] = useState(props.present);
    const [check, setCheck] = useState(props.check);
    const [index, setIndex] = useState(props.index);
    const [indexHolder, setIndexHolder] = useState(props.indexHolder);
    let activity = props.isActive ? 'active' : 'inactive'


    /*This useEffect looks unintuitive, but it causes the component to re-render when it's index is changed in the parent component*/
    useEffect(()=>{
        if (index !== props.index) {
            setIndex(props.index)
        }
        if (present !== props.present) {
            setPresent(props.present)
        }
    }, [])

    function passUpwards(keyValueObject) {
        props.updateComment(activity, props.home, keyValueObject)
    }

    function timeToNumber(str) {
        let split = str.split('')
        let splice = [...split.slice(0, 2), ...split.slice(3, 5)]
        let join = splice.join('')
        return Number(join)
    }

    function handleCheck() {
        setCheck(!check)
        passUpwards({check: !check})
    }

    function handleFocus(value, target) {
        let valueHolder = value
        target.value = ''
        target.value = valueHolder
    }

    function handleBlur() {
        let num = timeToNumber(indexHolder)
        setIndex(num)
        passUpwards({index: num, indexHolder: indexHolder})
    }

    function handleReindex(preValue, postValue) {
        props.adjustCommentIndex(preValue, postValue, activity, props.home)
    }

    const numIndex = (
        <div className='indexer commentMinor'>
            <input max='99' min='1' type='number' placeholder={index} onKeyDown={(event)=>{if(event.key === 'Enter') {event.target.blur()}}} onBlur={(event)=>{ event.target.value > 0 ? handleReindex(index, Number(event.target.value)) : event.target.value=''; event.target.value=''}}></input>
        </div>
    )

    const timeIndex = (
        <div style={{display: 'flex', flexDirection: 'column-reverse', justifyContent: 'center', flexBasis: '12%'}}>
            <input id={props.dateId+'timer'} className='timer' type='time' step='60' value={indexHolder} onChange={(event)=>setIndexHolder(event.target.value)} onBlur={()=>{handleBlur()}}></input>
            <label onClick={()=>{document.getElementById(props.dateId+'timer').focus()}} className='reschedule' >Reschedule</label>
        </div>
    )

    const whiteboard = (
        <div className='commentMajor' id={display+''}>
            <label id={props.dateId+'label'} className='commentLabel' onClick={()=>{setDisplay(!display)}}>
                {present}
            </label>
        </div>
    )

    const chalkboard = (
        <div className='commentMajor' id={display+''}>
            <div id={props.dateId+'form'} className='commentLabel'>
                <textarea id={props.dateId+'textarea'} value={present} onChange={(event)=>setPresent(event.target.value)} autoFocus onFocus={(event)=>handleFocus(event.target.value, event.target)}></textarea>
                <button id={props.dateId+'submit'} onClick={()=>{setDisplay(prevState=>({display: !prevState.display})); passUpwards({present: present})}}>Submit</button>
            </div>
        </div>
    )




    
    return(
    <div className='col-12 flexCenter commentWrapper' style={{order: index}}> 

        <label className='commentMinor flexCenter'>
            <input checked={check} onChange={()=>{handleCheck()}} type='checkbox' style={{width: '0', height: '0'}}></input>
            <div className='checkHouse flexCenter'></div>
        </label>

        {display ? whiteboard : chalkboard}

        {props.indexMode ? numIndex : timeIndex}

        <label htmlFor={props.dateId+'remover'} className='trashButton flexCenter' >
            <button id={props.dateId+'remover'} onClick={(event)=>{event.ctrlKey ? props.removeComment(props.isActive, props.home) : props.gatekeeper(props.isActive, props.home)}} hidden></button>
            <p className='tooltipText'>Hold ctrl and click to delete permanently</p>
        </label>

    </div>
    )




    
}