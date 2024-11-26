import { useParams } from 'react-router-dom'

export default function CodeBlockPage() {
    const params = useParams()
    console.log(params)

    return (
        <div>
            <div>{params.codeblockId}</div>
        </div>
    )
}
