import { CodeBlockPreview } from './CodeBlockPreview'

export default function CodeBlockList({ codeBlocks }) {
    return (
        <div>
            {codeBlocks.map(codeBlock => (
                <CodeBlockPreview codeBlock={codeBlock} key={codeBlock.id} />
            ))}
        </div>
    )
}
