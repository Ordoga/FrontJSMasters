// Hooks
import { useEffect, useState } from 'react'
import { useToast } from '../../hooks/use-toast'
import { useNavigate, useParams } from 'react-router-dom'

// Services and consts
// Stops  linter from splitting into multiple lines
// prettier-ignore
import { SOCKET_EVENT_CODE_CHANGED, SOCKET_EVENT_ENTER_CODEBLOCK_PAGE, SOCKET_EVENT_MENTOR_LEFT, SOCKET_EVENT_PROBLEM_SOLVED, SOCKET_EVENT_RESET_CODE, SOCKET_EVENT_SET_ROLE, SOCKET_EVENT_SET_USERS_IN_ROOM, SOCKET_EVENT_UPDATE_CODE, socketService } from '../../services/socket.service'
import { codeblockService } from '../../services/codeblock.service'

// Components
import Editor from '@monaco-editor/react'
import ProblemSolved from './ProblemSolved'
import InfoPanel from './InfoPanel'

export default function CodeBlockDetails() {
    const [codeblock, setCodeblock] = useState(null)
    const [isMentor, setIsMentor] = useState(null)
    const [roomStudentCount, setRoomStudentCount] = useState(null)
    const [isSolved, setIsSolved] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [currentCode, setCurrentCode] = useState(null)
    const [isImageVisible, setIsImageVisible] = useState(false)

    const eventHandlers = {
        [SOCKET_EVENT_UPDATE_CODE]: updateCode,
        [SOCKET_EVENT_SET_ROLE]: setRole,
        [SOCKET_EVENT_SET_USERS_IN_ROOM]: updateActiveUsers,
        [SOCKET_EVENT_MENTOR_LEFT]: mentorLeft,
        [SOCKET_EVENT_PROBLEM_SOLVED]: showSmiley,
        [SOCKET_EVENT_RESET_CODE]: handleResetCode,
    }

    const params = useParams()
    const navigate = useNavigate()
    const { toast } = useToast()

    // Sets font size based on mobile/desktop
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 639px)')
        setIsMobile(mediaQuery.matches)
    }, [])

    // Load new codeblock everytime params change
    useEffect(() => {
        loadCodeblock()
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
            throw err
        }
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

    function handleLocalCodeChange(newCode) {
        setCurrentCode(newCode)
        socketService.emit(SOCKET_EVENT_CODE_CHANGED, { newCode, codeblockId: codeblock._id })
    }

    function handleResetCode() {
        setCurrentCode(codeblock.initialCode)
        socketService.emit(SOCKET_EVENT_RESET_CODE, { codeblockId: codeblock._id })
    }

    function updateActiveUsers(userCount) {
        if (userCount === 1) toast({ title: 'Room Empty', duration: 2000 })
        else toast({ title: `Number of students in the room changed to ${userCount - 1}`, duration: 2000 })
        setRoomStudentCount(userCount - 1)
    }

    function setRole(isMentor) {
        setIsMentor(isMentor)
    }

    function mentorLeft() {
        navigate('/')
        toast({ title: 'Mentor left the codeblock room', variant: 'destructive', duration: 2500 })
    }

    function showSmiley() {
        showImage()
        setIsSolved(true)
    }

    function updateCode(newCode) {
        setCurrentCode(newCode)
    }

    function showImage() {
        setIsImageVisible(true)
        setTimeout(() => {
            setIsImageVisible(false)
        }, 4000)
    }

    // Only render component if currentCode received from server
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
            <div className='w-[95vw] flex items-center gap-2 mobile:flex-col'>
                <InfoPanel
                    name={codeblock.name}
                    roomStudentCount={roomStudentCount}
                    isMentor={isMentor}
                    handleResetCode={handleResetCode}
                />
                <div className='w-full h-[80vh] rounded-lg overflow-hidden mobile:w-[90vw] mobile:h-[65vh]'>
                    <Editor {...editorProps} />
                </div>
                {isImageVisible && <ProblemSolved isImageVisible={isImageVisible} />}
            </div>
        </section>
    )
}
