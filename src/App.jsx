import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Lobby } from './cmps/lobby/Lobby.jsx'

import './App.css'
import Header from './cmps/Header.jsx'
import CodeBlockPage from './cmps/CodeBlockPage/CodeBlockPage.jsx'

function App() {
    return (
        <Router>
            <div className='w-[100vw] h-[100vh] grid grid-rows-[auto_1fr]'>
                <Header />
                <main className='bg-[#DFF2EB]'>
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
