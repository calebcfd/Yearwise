import React from 'react'
import './index.css'
import {Year} from './Year.js'

export class Folder extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            currentDate: new Date(),
            data: localStorage.dataObject == undefined ? null : JSON.parse(localStorage.dataObject),
            display: true,
            present: null
        }

        
        this.updateFolderData = this.updateFolderData.bind(this)

    }

    

    updateFolderData(data) {
        this.setState({data: data})
    }

    

    

    render() {

        const dataObject={
            months: {
                0: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                1: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                2: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                3: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                4: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                5: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                6: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                7: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                8: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                9: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                10: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
                11: {
                    days: {},
                    Taskbar: {
                        active: [],
                        inactive: []
                    }
                },
            },
            Taskbar: {
                active: [],
                inactive: []}
        }

        let currentDay = this.state.currentDate.getDate()
        let currentMonth = this.state.currentDate.getMonth()
        let currentYear = this.state.currentDate.getFullYear()

        /* constants (thisYear, thisMonth, thisDay) are wrapped in different element types because otherwise no change is detected betwen the React virtual DOM and the previous snapshot when only the Year component is replaced. */

        const thisYear = (
            <div>
                <Year key={this.state.currentDate} display={true} present={null} edgeCase={null} currentDate={this.state.currentDate} data={this.state.data != null ? this.state.data : dataObject} passToFolder={this.updateFolderData} />
            </div>
        )

        const thisMonth = (
            <section>
                <Year key={this.state.currentDate} display={false} present={new Date(currentYear, currentMonth)} edgeCase={null} currentDate={this.state.currentDate} data={this.state.data != null ? this.state.data : dataObject} passToFolder={this.updateFolderData} />
            </section>
        ) 

        const thisDay = (
            <>
                <Year key={this.state.currentDate} display={false} present={new Date(currentYear, currentMonth)} edgeCase={new Date(currentYear, currentMonth, currentDay)} currentDate={this.state.currentDate} data={this.state.data != null ? this.state.data : dataObject} passToFolder={this.updateFolderData} />
            </>
        )

        const navigation = (
            <div id='navigation' className='tabHolder col-12 col-md-6' onLoad={()=>{this.setState({present: thisYear})}}>

                <div 
                    id='thisYear'
                    className='tab col-2 col-md-4 flexCenter'
                    style={{backgroundColor: 'var(--primaryRed)', color: 'var(--darkRed)', borderBottom: 'none'}}
                    onClick={()=>{this.setState({display: 'thisYear', present: thisYear})}}>
                        This Year
                </div>


                <div 
                    id='thisMonth'
                    className='tab col-2 col-md-4 flexCenter'
                    style={{backgroundColor: 'var(--primaryBlue)', color: 'var(--darkBlue)'}}
                    onClick={()=>{this.setState({display: 'thisMonth', present: thisMonth})}}>
                        This Month
                </div>


                <div 
                    id='thisDay'
                    className='tab col-2 col-md-4 flexCenter' 
                    style={{backgroundColor: 'var(--primaryGreen)', color: 'var(--darkGreen)'}}
                    onClick={()=>{this.setState({display: 'thisDay', present: thisDay})}}>
                        This Day
                </div>

            </div>
        )

        const flipper = (
            <div id='flipper'>
                <label class='flexCenter' onClick={()=>{window.scrollTo(0, window.innerHeight)}} style={{marginBottom: '12px'}}>
                    <div class="arrow" style={{transform: 'rotate(180deg)'}}></div>
                </label>
                <label class='flexCenter' onClick={()=>{window.scrollTo(0, 0)}} style={{height: '10vh', border: '1px solid black'}} >
                    <div class="arrow"></div>
                </label>
            </div>
        )


        
        if (this.state.present === null) {

            

            return (
                <section id='folder' className='col-12 col-md-6'>
        
                    {navigation}
    
                    <div id='holder'>
                        {thisYear}
                    </div>
    
                    {flipper}
    
    
                </section>
            )
        } else {

            

            return (
                <section id='folder' className='col-12 col-md-6'>
        
                    {navigation}
    
                    <div id='holder'>
                        {this.state.present}
                    </div>
    
                    {flipper}
    
    
                </section>
            )
        }
        
    }

        
}