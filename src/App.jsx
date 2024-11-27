import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Lobby } from './cmps/lobby/Lobby.jsx'

import './App.css'
import Header from './cmps/Header.jsx'
import CodeBlockPage from './cmps/CodeBlockPage/CodeBlockPage.jsx'
import { useEffect, useState } from 'react'
import { socketService } from './services/socket.service.js'
import Sidebar from './cmps/Sidebar.jsx'
function App() {
    const [userData, setUserData] = useState(null)
    const [userList, setUserList] = useState([])

    useEffect(() => {
        const nickname = prompt('Please Choose Nickname')
        // setNickname(nickname ? nickname : 'Default User')
        socketService.emit('setup-socket', { nickname })
        socketService.on('update-user-list', userList => {
            setUserList(userList)
        })
        socketService.on('set-user-data', userData => {
            setUserData(userData)
        })
        setUserList([
            { nickname: 'Or', score: 150, id: 1 },
            { nickname: 'Oriel', score: 2503, id: 2 },
            { nickname: 'Nurit', score: 1523, id: 3 },
            { nickname: 'Itzik', score: 2512, id: 4 },
        ])
    }, [])

    return (
        <Router>
            <div className='app-layout'>
                <Header userData={userData} />
                <Sidebar userList={userList} />
                <main className='bg-[#DFF2EB] main'>
                    <Routes>
                        <Route path='/' element={<Lobby />} />
                        <Route path='/codeblock/:codeblockId' element={<CodeBlockPage userData={userData} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
