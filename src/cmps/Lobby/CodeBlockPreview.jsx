import { Link } from 'react-router-dom'

export function CodeBlockPreview({ codeblock }) {
    return <Link to={`/${codeblock._id}`}>{codeblock.name}</Link>
}
