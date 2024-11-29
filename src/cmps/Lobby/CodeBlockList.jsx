import { CodeBlockPreview } from './CodeBlockPreview'

export default function CodeBlockList({ codeblocks, lbl }) {
    return (
        <div className='flex flex-col w-[90vw] flex-nowrap gap-y-6 items-center rounded-2xl mobile:pl-0'>
            <h2 className='text-3xl pt-4 mobile:pl-0'>{`${lbl} Codeblocks`}</h2>
            <div className='w-[80vw] grid  grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8 justify-items-center items-center mb-8 mobile:flex mobile:flex-col '>
                {codeblocks.map(codeblock => (
                    <CodeBlockPreview codeblock={codeblock} key={codeblock._id} />
                ))}
            </div>
        </div>
    )
}
