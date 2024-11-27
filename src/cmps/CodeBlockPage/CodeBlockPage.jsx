import { useNavigate, useParams } from 'react-router-dom'
import { codeblockService } from '../../services/codeblock.service'
import { useEffect, useState } from 'react'
import { socketService } from '../../services/socket.service'
import Editor from '@monaco-editor/react'

export default function CodeBlockPage() {
    const [codeblock, setCodeblock] = useState(null)
    const [isMentor, setIsMentor] = useState(null)
    const [isSolved, setIsSolved] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    // Mount to the dom
    useEffect(() => {
        socketService.emit('entered-codeblock-page', { codeblockId: params.codeblockId })
        socketService.on('update-code', updateCode)
        socketService.on('set-role', setRole)
        socketService.on('mentor-left', navigateToLobby)
        socketService.on('problem-solved', showSmiley)
        loadCodeblock()

        // Unmounted - Go to lobby
        return () => {
            // Leave all rooms
        }
    }, [])

    // Changed room - NOT DISCONNECTED
    useEffect(() => {
        // Change Room
        // How to make it not happen on the first render?
        // socketService.emit('entered-codeblock-page', { codeblockId: params.codeblockId })
    }, [params])

    function setRole(isMentor) {
        console.log(isMentor)

        setIsMentor(isMentor)
    }

    function navigateToLobby() {
        navigate('/')
    }

    function showSmiley() {
        setIsSolved(true)
    }

    async function loadCodeblock() {
        try {
            const codeblock = await codeblockService.getCodeblockById(params.codeblockId)
            setCodeblock({ ...codeblock, currentCode: codeblock.initalCode })
        } catch (err) {
            console.log(err)
        }
    }

    function updateCode(newCode) {
        setCodeblock(prevState => ({ ...prevState, currentCode: newCode }))
    }

    function resetCode() {
        setCodeblock(prevState => ({ ...prevState, currentCode: prevState.initalCode }))
    }

    async function handleCodeChange(value, event) {
        setCodeblock(prevState => ({ ...prevState, currentCode: value }))
        socketService.emit('changed-code', value)
    }

    if (!codeblock) return
    return (
        <div className='w-full flex flex-col items-center'>
            <h1>{codeblock.name}</h1>
            <h2>{isMentor ? 'Mentor' : 'Student'}</h2>
            <div className='size-[75vh] rounded-lg overflow-hidden'>
                <Editor
                    height='100%'
                    value={codeblock.currentCode}
                    language='javascript'
                    onChange={handleCodeChange}
                    theme='vs-dark'
                    options={{
                        readOnly: isMentor,
                        fontSize: 20,
                        scrollBeyondLastLine: false,
                        scrollbar: {
                            vertical: 'auto',
                        },
                    }}
                />
            </div>
            {isMentor && (
                <button onClick={resetCode} className='m-2 bg-[#4A628A] text-[#DFF2EB]'>
                    Reset Code
                </button>
            )}
            {isSolved && <h1>{`:)))))`}</h1>}
        </div>
    )
}
