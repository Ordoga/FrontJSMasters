import { CodeBlockPreview } from './CodeBlockPreview'

export default function CodeBlockList({ codeblocks }) {
    console.log(codeblocks)
    return (
        <div>
            {codeblocks?.map(codeblock => (
                <CodeBlockPreview codeblock={codeblock} key={codeblock._id} />
            ))}
        </div>
    )
}
