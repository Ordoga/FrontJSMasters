import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function CodeBlockPreview({ codeblock }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link to={`/codeblock/${codeblock._id}`}>
            <div
                className='flex flex-col items-center p-4 gap-4 bg-[#B9E5E8] rounded-3xl codeblock-preview'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h3 className='text-2xl'>{codeblock.name}</h3>
                <div className='size-[200px] rounded-xl overflow-hidden'>
                    <Editor
                        className='hover:cursor-pointer'
                        value={codeblock.initalCode}
                        language={isHovered ? 'javascript' : 'plaintext'}
                        theme='vs-dark'
                        options={options}
                    />
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
}
