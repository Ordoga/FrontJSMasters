import { useNavigate, useParams } from 'react-router-dom'
import { codeblockService } from '../../services/codeblock.service'
import { useEffect, useState } from 'react'
import { socketService } from '../../services/socket.service'
import Editor from '@monaco-editor/react'

export default function CodeBlockPage({}) {
    const [codeblock, setCodeblock] = useState(null)
    const [isMentor, setIsMentor] = useState(null)
    const [usersInRoom, setUsersInRoom] = useState(null)
    const [isSolved, setIsSolved] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    // Mount to the dom
    useEffect(() => {
        socketService.emit('enter-codeblock-page', { codeblockId: params.codeblockId })
        socketService.on('update-code', updateCode)
        socketService.on('set-role', setRole)
        socketService.on('set-users-in-room', updateActiveUsers)
        socketService.on('mentor-left', navigateToLobby)
        socketService.on('problem-solved', showSmiley)
        loadCodeblock()
    }, [])

    function updateActiveUsers(userCount) {
        setUsersInRoom(userCount)
    }

    // Changed room - NOT DISCONNECTED
    useEffect(() => {
        // Change Room
        // How to make it not happen on the first render?
        socketService.emit('entered-codeblock-page', { codeblockId: params.codeblockId })
    }, [params])

    function setRole(isMentor) {
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
            setCodeblock({ ...codeblock, currentCode: codeblock.initialCode })
        } catch (err) {
            console.log(err)
        }
    }

    function updateCode(newCode) {
        setCodeblock(prevState => ({ ...prevState, currentCode: newCode }))
    }

    function resetCode() {
        setCodeblock(prevState => ({ ...prevState, currentCode: prevState.initialCode }))
    }

    async function handleCodeChange(value, event) {
        setCodeblock(prevState => ({ ...prevState, currentCode: value }))
        socketService.emit('changed-code', value)
    }

    if (!codeblock) return
    const editorProps = {
        height: '100%',
        value: codeblock.currentCode,
        language: 'javascript',
        onChange: handleCodeChange,
        theme: 'vs-dark',
        options: {
            readOnly: isMentor || isSolved,
            fontSize: 20,
            scrollBeyondLastLine: false,
            scrollbar: {
                vertical: 'auto',
            },
            wordWrap: 'on',
        },
    }
    return (
        <div className='w-full flex flex-col items-center'>
            <div className='grid w-full grid-cols-3'>
                <button className='justify-self-start bg-transparent border-none' onClick={navigateToLobby}>
                    Back To Lobby
                </button>
                <h1 className='text-center col-span-1 text-2xl'>{`${codeblock.name} Active Students: ${usersInRoom - 1}`}</h1>
            </div>
            <h2>{isMentor ? 'Mentor' : 'Student'}</h2>
            <div className='size-[75vh] rounded-lg overflow-hidden'>
                <Editor {...editorProps} />
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
