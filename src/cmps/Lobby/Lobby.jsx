import { useEffect, useState } from 'react'
import CodeBlockList from './CodeBlockList'
import { codeblockService } from '../../services/codeblock.service'

export function Lobby() {
    const [codeblocks, setCodeblocks] = useState([])

    useEffect(() => {
        getCodeblocks()
    }, [])

    async function getCodeblocks() {
        const codeblocks = await codeblockService.query()
        console.log(codeblocks)
        setCodeblocks(codeblocks)
    }

    return (
        <div className='w-full bg-slate-400 flex flex-col items-center'>
            <div>Choose Code Block</div>
            <CodeBlockList codeBlocks={codeblocks} />
        </div>
    )
}
