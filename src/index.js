import React from 'react'
import ReactDOM from 'react-dom/client'
import {Comment} from './Comment.js'
import {Folder} from './Folder.js'
import {Day} from './Day.js'
import {Taskbar} from './Taskbar.js'



class App extends React.Component {


    render() {
        return(
            <Folder />
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)