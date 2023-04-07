import React, {setState} from 'react'
import './index.css'
import {Comment} from './Comment.js'

export class Taskbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dateId: Date(),
            timeout: 0,
            display: true,
            data: props.data,
            valueHolder: null
        }

        this.debounce = this.debounce.bind(this)
        this.updateComment = this.updateComment.bind(this)
        this.adjustCommentIndex = this.adjustCommentIndex.bind(this)
        this.addComment = this.addComment.bind(this)
        this.gatekeeper = this.gatekeeper.bind(this)
        this.removeComment = this.removeComment.bind(this)

    }

    

    componentWillUnmount(props = this.props) {
            props.passToParent('Taskbar', this.state.data)
        }

    debounce(callback) {
        clearTimeout(this.state.timeout)
        let timer = setTimeout(callback, 250)
        this.setState({timeout: timer})

    }

    updateComment(activity, home, keyValueObject) {
        let prevData = this.state.data
        for (let key of Object.keys(keyValueObject)) {
            prevData[activity][home][key] = keyValueObject[key] 
        }
        
        this.setState({data: prevData})
    }

    adjustCommentIndex(preValue, postValue, activity, home) {
        let prevData = JSON.parse(JSON.stringify(this.state.data))
        let dif = postValue - preValue
        
        if(dif > 0) {

            for (let comment of prevData[activity]) {
                
                if (preValue < comment.index && comment.index <= postValue) {
                    comment.index--
                }
            }
            prevData[activity][home].index = postValue
            this.setState({data: prevData})

        } else if (dif < 0) {

            for (let comment of prevData[activity]) {
                
                if (postValue <= comment.index && comment.index < preValue) {
                    comment.index++
                }
            }
            prevData[activity][home].index = postValue
            this.setState({data: prevData})

        }

    }

    addComment(present) {

        if (present == null) {
            document.getElementById(this.state.dateId+'input').style.border = '2px solid var(--primaryRed)'
            return null
        }

        const Com = {
            present: present,
            dateId: Date(),
            check: false,
            index: this.state.data.active.length+1,
            indexHolder: this.state.data.active.length+1+''
        }

        let prevState = JSON.parse(JSON.stringify(this.state.data))
        prevState.active.push(Com)

        this.setState({data: prevState})

    }

    gatekeeper(activity, home) {
        let destination = activity ? 'inactive' : 'active'
        let status = activity ? 'active' : 'inactive'
        let prevState = JSON.parse(JSON.stringify(this.state.data))
        let vagabond = prevState[status].splice(home, 1)
        vagabond = vagabond[0]
        vagabond.index = prevState[destination].length+1
        vagabond.indexHolder = prevState[destination].length+1+''
        prevState[destination].push(vagabond)
        for (let i = home; i < prevState[status].length; i++) {
            prevState[status][i].index--
            prevState[status][i].indexHolder = (Number(prevState[status][i].indexHolder)-1)+''
        }
        this.setState({data: prevState})
    }

    removeComment(activity, home) {
        let status = activity ? 'active' : 'inactive'
        this.setState((prevState)=>{
            prevState.data[status].splice(home, 1)
            for (let i = home; i < prevState.data[status].length; i++) {
                prevState.data[status][i].index--
                prevState.data[status][i].indexHolder = Number(prevState.data[status][i].indexHolder)-1+''
            }
            return prevState
        })
    }

    render() {

        const activity = this.state.display ? 'active' : 'inactive'
        const bgc = this.state.display ? 'var(--darkBlue)' : 'var(--darkGray)'
        const tabFeet = this.state.display ? 'none' : '2px solid black'
        const oppositeTabFeet = this.state.display ? '2px solid black' : 'none'
        const borderTop = this.state.display ? 'none' : '2px solid black'
        const radiusTop = this.state.display ? '0' : '10px'

        const taskInput = (
            <div className='row taskInput col-12' style={{backgroundColor: bgc}} >
                <input id={this.state.dateId+'input'} className='col-10' onChange={(event)=>{this.setState({valueHolder: event.target.value})}} placeholder={'This '+this.props.when+', I will...'} type='text'></input>
                <button className='col-2' onClick={()=>{this.debounce(this.addComment(this.state.valueHolder))}}>Enter</button>
            </div>
        )

        return(


            <div className='Taskbar container-fluid col-md-6'>

                <div className='tabHolder row col-12'>
                    <div className='tab col-2 flexCenter activeTab' onClick={event=>{this.setState(prevState=>({display: !prevState.display}))}} style={{backgroundColor: 'var(--darkBlue)', borderBottom: tabFeet}}>Taskbar</div>
                    <div className='tab col-2 flexCenter' onClick={event=>{this.setState(prevState=>({display: !prevState.display}))}} style={{backgroundColor: 'var(--darkGray)', borderBottom: oppositeTabFeet}}>Dustbin</div>
                </div>

                {this.state.display ? taskInput : <></>}

                <div className='row col-12' style={{backgroundColor: bgc, minHeight: 'calc(84vh - 55px)', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', borderTopRightRadius: radiusTop, border: '2px solid black', borderTop: borderTop}}>

                    

                    <div className='commentCollector col-12' >
                        {this.state.data[activity].map((item, index)=>{
                            return <Comment updateComment={this.updateComment} adjustCommentIndex={this.adjustCommentIndex} gatekeeper={this.gatekeeper} removeComment={this.removeComment} present={item.present} isActive={this.state.display} home={this.state.data[activity].indexOf(item)} key={item.dateId+index} dateId={item.dateId} check={item.check} index={item.index} indexHolder={item.indexHolder} indexMode={true}/>
                        })}
                    </div>

                </div>
                
            </div>
        )
    }

}