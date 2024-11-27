import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function CodeBlockPreview({ codeblock }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link to={`/codeblock/${codeblock._id}`}>
            <div
                className='card group w-[280px] h-[300px] rounded-md overflow-hidden shadow transition-all duration-[400ms] hover:shadow-xl hover:w-[300px]'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='h-1/3 flex items-center justify-center transition-all ease-out duration-[500ms] group-hover:h-[60%]'>
                    <Editor
                        className=''
                        value={codeblock.initialCode}
                        language={isHovered ? 'javascript' : 'plaintext'}
                        theme='vs-dark'
                        options={options}
                    />
                </div>
                <div className='px-2 h-3/4 bg-white flex flex-col p-4'>
                    <h3 className='text-2xl self-start'>{codeblock.name}</h3>
                    <p className='text-xs self-start transition-opacity duration-300 group-hover:opacity-0'>{codeblock.desc}</p>
                </div>
            </div>
        </Link>
    )
}

export const options = {
    readOnly: true,
    minimap: {
        enabled: false,
    },
    lineNumbers: 'off',
    scrollbar: {
        vertical: 'hidden',
        horizontal: 'hidden',
    },
    fontSize: 11,
    folding: false,
    scrollBeyondLastLine: false,
    wordWrap: 'on',
}
