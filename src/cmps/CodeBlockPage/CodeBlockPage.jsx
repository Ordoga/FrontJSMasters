import { useParams } from 'react-router-dom'
import { codeblockService } from '../../services/codeblock.service'
import { useEffect, useState } from 'react'

export default function CodeBlockPage() {
    const [codeblock, setCodeblock] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadCodeblock()
    }, [params])

    async function loadCodeblock() {
        try {
            const codeblock = await codeblockService.getCodeblockById(params.codeblockId)
            setCodeblock({ ...codeblock, currentCode: codeblock.initalCode })
        } catch (err) {
            console.log(err)
        }
    }

    async function handleCodeChange(e) {
        setCodeblock({ ...codeblock, currentCode: e.target.value })
    }

    if (!codeblock) return
    return (
        <div className='w-full flex flex-col items-center'>
            <h1>{codeblock.name}</h1>
            <textarea value={codeblock.currentCode} onChange={handleCodeChange} className='w-52 h-52 bg-slate-300 rounded-md' />
        </div>
    )
}
