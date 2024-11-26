import { Link } from 'react-router-dom'

export function CodeBlockPreview({ codeblock }) {
    return <Link to={`/codeblock/${codeblock._id}`}>{codeblock.name}</Link>
}
