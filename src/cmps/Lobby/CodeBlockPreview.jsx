import { Link } from 'react-router-dom'

export function CodeBlockPreview({ codeBlock }) {
    return <Link to={`/${codeBlock.id}`}>{codeBlock.name}</Link>
}
