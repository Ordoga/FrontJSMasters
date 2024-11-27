import { CodeBlockPreview } from './CodeBlockPreview'

export default function CodeBlockList({ codeblocks, lbl = null }) {
    return (
        <div className='flex flex-col w-full flex-nowrap p-8 gap-y-6'>
            {lbl && <h2 className='text-3xl pl-4'>{lbl}</h2>}
            <div className='w-full grid gap-8 grid-cols-[repeat(auto-fill,minmax(200px,300px))]'>
                {codeblocks?.map(codeblock => (
                    <CodeBlockPreview codeblock={codeblock} key={codeblock._id} />
                ))}
            </div>
        </div>
    )
}
