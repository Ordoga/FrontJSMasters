import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Lobby } from './cmps/lobby/Lobby.jsx'

import './App.css'
import Header from './cmps/Header.jsx'
import CodeBlockPage from './cmps/CodeBlockPage/CodeBlockPage.jsx'
import { useEffect, useState } from 'react'
import { socketService } from './services/socket.service.js'
import Sidebar from './cmps/Sidebar.jsx'
function App() {
    // const [userData, setUserData] = useState(null)
    // const [userList, setUserList] = useState([])

    useEffect(() => {
        // const nickname = prompt('Please Choose Nickname') || 'Default Name'
        // socketService.emit('setup-socket', { nickname })
        // socketService.on('set-user-data', userData => {
        //     setUserData(userData)
        // })
        // socketService.on('set-connected-users', userList => {
        //     setUserList(userList)
        // })
    }, [])

    return (
        <Router>
            <div className='app-layout'>
                <Header />
                {/* <Sidebar /> */}
                <main className='bg-[#DFF2EB] main'>
                    <Routes>
                        <Route path='/' element={<Lobby />} />
                        <Route path='/codeblock/:codeblockId' element={<CodeBlockPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
