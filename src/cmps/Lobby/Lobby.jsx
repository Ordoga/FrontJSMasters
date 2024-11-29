import { useEffect, useMemo, useState } from 'react'
import { codeblockService } from '../../services/codeblock.service'
import { SOCKET_EVENT_ENTER_LOBBY, socketService } from '../../services/socket.service'
import CodeBlockList from './CodeBlockList'

export default function Lobby() {
    const [codeblocks, setCodeblocks] = useState(null)

    useEffect(() => {
        getCodeblocks()
    }, [])

    // Only emit lobby enter event if codeblocks exist
    useEffect(() => {
        if (!codeblocks) return
        socketService.emit(SOCKET_EVENT_ENTER_LOBBY)
    }, [codeblocks])

    async function getCodeblocks() {
        const codeblocks = await codeblockService.query()
        setCodeblocks(codeblocks)
    }

    // Only run splitting data when codeblocks change
    const groupedCodeblocks = useMemo(() => {
        if (!codeblocks) return
        const levelMapping = { 1: 'Easy', 2: 'Medium', 3: 'Hard' }
        return codeblocks.reduce((acc, codeblock) => {
            const levelLabel = levelMapping[codeblock.level]
            if (!acc[levelLabel]) acc[levelLabel] = []
            acc[levelLabel].push(codeblock)
            return acc
        }, {})
    }, [codeblocks])

    if (!groupedCodeblocks) return <div>Loading...</div>
    return (
        <div className='flex flex-col items-center'>
            <div className='text-3xl pt-4 weight font-semibold'>Choose Code Block</div>
            {Object.entries(groupedCodeblocks).map(([level, codeblocks]) => (
                <CodeBlockList codeblocks={codeblocks} lbl={level} key={level} />
            ))}
        </div>
    )
}
