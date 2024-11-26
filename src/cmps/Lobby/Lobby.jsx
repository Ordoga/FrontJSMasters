import { useEffect, useState } from 'react'
import CodeBlockList from './CodeBlockList'
import { codeblockService } from '../../services/codeblock.service'
import { socketService } from '../../services/socket.service'

export function Lobby() {
    const [codeblocks, setCodeblocks] = useState([])

    useEffect(() => {
        getCodeblocks()

        socketService.on('user-connected', data => {
            console.log(data)
        })
    }, [])

    async function getCodeblocks() {
        const codeblocks = await codeblockService.query()
        setCodeblocks(codeblocks)
    }

    return (
        <div className='w-full bg-slate-400 flex flex-col items-center'>
            <div>Choose Code Block</div>
            <CodeBlockList codeblocks={codeblocks} />
        </div>
    )
}
