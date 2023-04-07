import React from 'react'
import './index.css'
import {Comment} from './Comment.js'



export class Schedule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dateId: Date(),
            timeout: 0,
            display: true,
            data: props.data,
            data2: props.data
        }



        this.addComment = this.addComment.bind(this)
        this.debounce = this.debounce.bind(this)
        this.updateComment = this.updateComment.bind(this)
        this.gatekeeper = this.gatekeeper.bind(this)
        this.removeComment = this.removeComment.bind(this)

    }

    componentWillUnmount(props = this.props) {
        props.passToDay('Schedule', this.state.data)
    }

    addComment() {
        let input = document.getElementById(this.state.dateId+'input')
        let timer = document.getElementById(this.state.dateId+'timer')
        let value = input.value
        let time = timer.value

        if (value == "") {
            input.style.border = '2px solid var(--primaryRed)'
            input.placeholder = 'Required'
            return null
        }

        if (time == "") {
            timer.style.border = '2px solid var(--primaryRed)'
            return null
        }

        let split = time.split('')
        split.splice(2, 1)
        let index = Number(split.join(''))
        let date = Date()
    
        this.setState(prevState=>({data: { inactive: prevState.data.inactive, active: [...prevState.data.active, {dateId: date, present: value, index: index, indexHolder: time, check: false}]}}))

    }

    debounce(callback) {
        clearTimeout(this.state.timeout)
        let timer = setTimeout(()=>callback(), 200)
        this.setState({timeout: timer})

    }

    updateComment(activity, home, keyValueObject) {
        let prevData = this.state.data
        for (let key of Object.keys(keyValueObject)) {
            prevData[activity][home][key] = keyValueObject[key] 
        }
        this.setState({data: prevData})
    }

    gatekeeper(activity, home) {
        let destination = activity ? 'inactive' : 'active'
        let status = activity ? 'active' : 'inactive'
        let prevState = JSON.parse(JSON.stringify(this.state.data))
        let vagabond = prevState[status].splice(home, 1)
        vagabond = vagabond[0]
        prevState[destination].push(vagabond)
        this.setState({data: prevState})
    }

    removeComment(activity, home) {
        let status = activity ? 'active' : 'inactive'
        this.setState((prevState)=>{
            prevState.data[status].splice(home, 1)
            return prevState
        })
    }


    render() {

        const activity = this.state.display ? 'active' : 'inactive';
        const bgc = this.state.display ? 'var(--primaryYellow)' : 'var(--darkGray)'
        const borderTop = this.state.display ? 'none' : '2px solid black'
        const radiusTop = this.state.display ? '0' : '10px'

        const inputRow = (
            <div className='row taskInput col-12' style={{position: 'relative', backgroundColor: bgc, borderTopLeftRadius: '10px'}}>
                <input id={this.state.dateId+'input'} className='col-8' placeholder='What is in store for Today?' type='text'></input>

                <input id={this.state.dateId+'timer'} className='col-2' type='time' step='60'></input>

                <button className='col-2' onClick={()=>{this.debounce(this.addComment)}}>Enter</button>
            </div>
        )

            return(

                <div className='Schedule container-fluid'>

                
                {this.state.display ? inputRow : null}
                

                <svg style={{cursor: 'pointer', width: '80px', height: '50px', position: 'absolute', right: '0px', top: '-60px', padding: 'none', fill: 'var(--darkGreen)'}} onClick={()=>{this.debounce(()=>{this.setState((prevState)=>({display: !prevState.display}))})}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
                </svg>

                <div className='row col-12' style={{backgroundColor: bgc, borderRadius: '10px', borderTopLeftRadius: radiusTop, WebkitBorderTopRightRadius: radiusTop, border: '2px solid black', borderTop: borderTop}}>

                    <div className='commentCollector col-12'>
                        {Array.from(this.state.data[activity]).map((item, index)=>{
                            return <Comment updateComment={this.updateComment} gatekeeper={this.gatekeeper} removeComment={this.removeComment} present={item.present} key={item.dateId+index} dateId={item.dateId} check={item.check} indexMode={item.indexMode} indexHolder={item.indexHolder} index={item.index} home={index} isActive={this.state.display} />
                        })}
                    </div>

                </div>
                    


                </div>

            )
    }
}