import { useEffect, useState } from 'react'
import CodeBlockList from './CodeBlockList'
import { codeblockService } from '../../services/codeblock.service'
import { socketService } from '../../services/socket.service'

export function Lobby() {
    const [codeblocks, setCodeblocks] = useState([])

    useEffect(() => {
        getCodeblocks()
    }, [])

    async function getCodeblocks() {
        const codeblocks = await codeblockService.query()
        const blocksByLevel = {}
        codeblocks.forEach(codeblock => {
            if (!blocksByLevel[codeblock.level]) {
                blocksByLevel[codeblock.level] = []
            }
            blocksByLevel[codeblock.level].push(codeblock)
        })
        setCodeblocks(blocksByLevel)
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='text-3xl p-4 weight font-semibold'>Choose Code Block</div>
            <div className='w-full flex flex-col justify-center items-center'>
                <CodeBlockList lbl={'Easy'} codeblocks={codeblocks[1]} />
                <CodeBlockList lbl={'Medium'} codeblocks={codeblocks[2]} />
                <CodeBlockList lbl={'Hard'} codeblocks={codeblocks[3]} />
            </div>
        </div>
    )
}
