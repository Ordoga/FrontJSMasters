import { useParams } from 'react-router-dom'
import { codeblockService } from '../../services/codeblock.service'
import { useEffect, useState } from 'react'

export default function CodeBlockPage() {
    const [codeblock, setCodeblock] = useState(null)
    const params = useParams()
    console.log(params)

    useEffect(() => {
        loadCodeblock()
    }, [params])

    async function loadCodeblock() {
        try {
            const codeblock = await codeblockService.getCodeblockById(params.codeblockId)
            console.log(codeblock)

            setCodeblock(codeblock)
        } catch (err) {
            console.log(err)
        }
    }

    if (!codeblock) return
    return (
        <div className='w-full flex flex-col items-center'>
            <h1>{codeblock.name}</h1>
        </div>
    )
}
