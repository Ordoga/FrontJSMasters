import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Lobby } from './cmps/Lobby/Lobby.jsx'

import './App.css'
import Header from './cmps/Header.jsx'
import CodeBlockPage from './cmps/CodeBlockPage/CodeBlockPage.jsx'

function App() {
    return (
        <Router>
            <div className='w-[100vw] h-[100vh] grid grid-rows-[auto_1fr]'>
                <Header />
                <Routes>
                    <Route path='/' element={<Lobby />} />
                    <Route path='/:codeblockId' element={<CodeBlockPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
