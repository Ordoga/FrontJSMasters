import './App.css'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

import AppHeader from './cmps/AppHeader.jsx'
import Lobby from './cmps/lobby/Lobby.jsx'
import CodeBlockDetails from './cmps/CodeBlockDetails/CodeBlockDetails.jsx'

function App() {
    return (
        <Router>
            <div className='app-layout'>
                <AppHeader />
                <main className='bg-main main'>
                    <Routes>
                        <Route path='/' element={<Lobby />} />
                        <Route path='/codeblock/:codeblockId' element={<CodeBlockDetails />} />
                    </Routes>
                </main>
                <Toaster />
            </div>
        </Router>
    )
}

export default App
