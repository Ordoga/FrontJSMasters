import CodeBlockList from './CodeBlockList'

export function Lobby() {
    const codeBlocks = [
        { name: 'code1', id: '1' },
        { name: 'code2', id: '2' },
    ]

    return (
        <div className='w-full bg-slate-400 flex flex-col items-center'>
            <div>Choose Code Block</div>
            <CodeBlockList codeBlocks={codeBlocks} />
        </div>
    )
}
