import { useNavigate, useParams } from 'react-router-dom'
import { codeblockService } from '../../services/codeblock.service'
import { useEffect, useState } from 'react'
import {
    SOCKET_EVENT_ENTER_CODEBLOCK_PAGE,
    SOCKET_EVENT_MENTOR_LEFT,
    SOCKET_EVENT_PROBLEM_SOLVED,
    SOCKET_EVENT_RESET_CODE,
    SOCKET_EVENT_SET_ROLE,
    SOCKET_EVENT_SET_USERS_IN_ROOM,
    SOCKET_EVENT_UPDATE_CODE,
    socketService,
} from '../../services/socket.service'
import Editor from '@monaco-editor/react'
import { useToast } from '../../hooks/use-toast'

export default function CodeBlockDetails() {
    const [codeblock, setCodeblock] = useState(null)
    const [isMentor, setIsMentor] = useState(null)
    const [studentsInRoom, setStudentsInRoom] = useState(null)
    const [isSolved, setIsSolved] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [currentCode, setCurrentCode] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const { toast } = useToast()

    // Page mounts to the dom - load New Codeblock
    useEffect(() => {
        loadCodeblock()
        const mediaQuery = window.matchMedia('(max-width: 639px)')
        setIsMobile(mediaQuery.matches)
    }, [params])

    // Only subscribe to events if the codeblock exists
    useEffect(() => {
        if (!codeblock) return
        subToEvents(eventHandlers)
        return () => {
            unsubFromEvents(eventHandlers)
        }
    }, [codeblock])

    async function loadCodeblock() {
        try {
            const codeblock = await codeblockService.getCodeblockById(params.codeblockId)
            socketService.emit(SOCKET_EVENT_ENTER_CODEBLOCK_PAGE, { codeblockId: params.codeblockId })
            toast({ title: `Entered the codeblock ${codeblock.name}`, duration: 2000 })
            setCodeblock({ ...codeblock, currentCode: codeblock.initialCode })
        } catch (err) {
            toast({ title: 'Cound not load the codeblock', variant: 'destructive', duration: 2000 })
            console.log(err)
        }
    }

    const eventHandlers = {
        [SOCKET_EVENT_UPDATE_CODE]: updateCode,
        [SOCKET_EVENT_SET_ROLE]: setRole,
        [SOCKET_EVENT_SET_USERS_IN_ROOM]: updateActiveUsers,
        [SOCKET_EVENT_MENTOR_LEFT]: MentorLeft,
        [SOCKET_EVENT_PROBLEM_SOLVED]: showSmiley,
        [SOCKET_EVENT_RESET_CODE]: handleResetCode,
    }

    function subToEvents(eventHandlers) {
        Object.entries(eventHandlers).forEach(([event, handler]) => {
            socketService.on(event, handler)
        })
    }

    function unsubFromEvents(eventHandlers) {
        Object.entries(eventHandlers).forEach(([event, handler]) => {
            socketService.off(event, handler)
        })
    }

    function updateActiveUsers(userCount) {
        if (userCount === 1) toast({ title: 'Room Initialized', description: 'Students can now start coding', duration: 2000 })
        else toast({ title: `Number of students in the room changed to ${userCount - 1}`, duration: 2000 })
        setStudentsInRoom(userCount - 1)
    }

    function setRole(isMentor) {
        setIsMentor(isMentor)
    }

    function goBackToLobby() {
        navigate('/')
    }

    function MentorLeft() {
        navigate('/')
        toast({ title: 'Mentor left the codeblock room', variant: 'destructive', duration: 2500 })
    }

    function showSmiley() {
        toast({ title: 'Codeblock Solved!', duration: 2000, variant: 'success' })
        setIsSolved(true)
    }

    function updateCode(newCode) {
        setCurrentCode(newCode)
    }

    function handleLocalCodeChange(newCode, event) {
        setCurrentCode(newCode)
        socketService.emit('changed-code', { newCode, codeblockId: codeblock._id })
    }

    function handleResetCode() {
        setCurrentCode(codeblock.initialCode)
        socketService.emit('reset-code', { codeblockId: codeblock._id })
    }

    if (!codeblock || !currentCode) return
    const editorProps = {
        height: '100%',
        value: currentCode,
        language: 'javascript',
        onChange: handleLocalCodeChange,
        theme: 'vs-dark',
        options: {
            readOnly: isMentor || isSolved,
            fontSize: isMobile ? 14 : 18,
            scrollBeyondLastLine: false,
            scrollbar: {
                vertical: 'auto',
            },
            wordWrap: 'on',
        },
    }
    return (
        <section className='w-full flex flex-col items-center pt-8'>
            <div className='w-[95vw] flex items-center gap-2 '>
                <div className='flex flex-col items-center h-[80vh] justify-between w-[250px] bg-[#1e1e1e] p-4 text-[#f1f1f1] rounded-lg'>
                    <div className='flex flex-col text-center items-center gap-4'>
                        <h1 className='text-2xl font-semibold'>{`${codeblock.name}`}</h1>
                        <h1 className='text-2xl'>{`Active Students: ${studentsInRoom}`}</h1>
                        <h2 className='text-md'>{`Role: ${isMentor ? 'Mentor (Read Only)' : 'Student'}`}</h2>
                    </div>
                    <div className='flex flex-col items-center'>
                        <button className='orange-button' onClick={goBackToLobby}>
                            Back To Lobby
                        </button>
                        {isMentor && (
                            <button onClick={() => handleResetCode()} className='orange-button'>
                                Reset Code
                            </button>
                        )}
                    </div>
                </div>
                <div className='w-full h-[80vh] rounded-lg overflow-hidden mobile:w-[90vw] mobile:h-[70vh]'>
                    <Editor {...editorProps} />
                </div>
                {isSolved && <h1>{`:)))))`}</h1>}
            </div>
        </section>
    )
}
