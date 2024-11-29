import { Editor } from '@monaco-editor/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function CodeBlockPreview({ codeblock }) {
    const [isHovered, setIsHovered] = useState(false)

    const editorOptions = {
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
        readOnly: true,
        cursorStyle: 'pointer',
    }

    return (
        <Link to={`/codeblock/${codeblock._id}`}>
            <div
                className='card group w-[280px] h-[300px] duration-500 hover:w-[300px] hover: shadow-xl'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='h-1/3 flex items-center justify-center transition-all ease-out duration-500 group-hover:h-[50%]'>
                    <Editor
                        className=''
                        value={codeblock.initialCode}
                        language={isHovered ? 'javascript' : 'plaintext'}
                        theme='vs-dark'
                        options={editorOptions}
                    />
                </div>

                <div className='px-2 py-2 h-3/4 bg-transparent flex flex-col gap-2 max-w-[280px]'>
                    <h3 className='text-2xl self-start'>{codeblock.name}</h3>
                    <p className='text-xs self-start transition-opacity duration-300 group-hover:opacity-0 group-hover:h-0'>
                        {codeblock.desc}
                    </p>
                    <button
                        className={`bg-slate-50 h-[44px] w-[170px] mt-2 color-[#292929] font-bold uppercase text-sm rounded border-[1px] border-slate-700 hover:border-0 hover:text-[#f1f1f1] group-hover:shadow-[inset_13rem_0_0_0] group-hover:shadow-orange-400 duration-700 transition-[color,box-shadow,opacity] ${
                            isHovered ? 'opacity-100 h-[44px] w-[170px]' : 'opacity-0 h-0 p-0 m-0'
                        }`}
                    >
                        Go To Code Block
                    </button>
                    {/* // TODO Extract Classes */}
                </div>
                <div
                    className={`absolute top-2 right-2 w-16 h-5 bg-gray-200 rounded-xl flex items-center justify-around border px-[3px] ${
                        codeblock.isActive
                            ? 'border-green-600 font-semibold'
                            : 'bg-neutral-800 text-zinc-500 opacity-70 border-none'
                    }`}
                >
                    <div className=''>Live</div>
                    <div
                        // TODO Extract Classes
                        className={`size-[14px] rounded-3xl  ${codeblock.isActive ? 'bg-green-600 live-flash' : 'bg-red-950'}`}
                    ></div>
                </div>
            </div>
        </Link>
    )
}
