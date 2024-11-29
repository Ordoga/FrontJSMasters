import { useEffect, useState } from 'react'
import { codeblockService } from '../../services/codeblock.service'
import { SOCKET_EVENT_ENTER_LOBBY, socketService } from '../../services/socket.service'
import CodeBlockList from './CodeBlockList'
import TripleToggleSwitch from '../../components/ui/TripleSwitch/TripleSwitch'

export default function Lobby() {
    const [codeblocks, setCodeblocks] = useState(null)
    const [currentSwitchPosition, setCurrentSwitch] = useState('Medium')
    // const [activeRooms, setActiveRooms] = useState(null)

    // Change all events to CONSTS
    useEffect(() => {
        getCodeblocks()
    }, [])

    useEffect(() => {
        if (!codeblocks) return
        socketService.emit(SOCKET_EVENT_ENTER_LOBBY)
        // socketService.on('set-active-rooms', updateActiveRooms)

        return () => {
            // socketService.off('set-active-rooms', updateActiveRooms)
        }
    }, [codeblocks])

    async function getCodeblocks() {
        const codeblocks = await codeblockService.query()
        setCodeblocks(codeblocks)
    }

    // function updateActiveRooms(activeRooms) {
    //     setActiveRooms(activeRooms)
    // }

    const labels = {
        left: {
            title: 'Easy',
            value: 'Easy',
            desc: 'Show Easy Code Blocks',
        },
        right: {
            title: 'Hard',
            value: 'Hard',
            desc: 'Show Hard Code Blocks',
        },
        center: {
            title: 'Medium',
            value: 'Medium',
            desc: 'Show Medium Code Blocks',
        },
    }

    function handleChangeSwitch(position) {
        if (position === 'left') {
            setCurrentSwitch('Easy')
        } else if (position === 'right') {
            setCurrentSwitch('Hard')
        } else if (position === 'center') {
            setCurrentSwitch('Medium')
        }
    }

    //  TODO Loader
    if (!codeblocks) return <div>Loading...</div>
    return (
        <div className='flex flex-col items-center'>
            <div className='text-3xl pt-4 weight font-semibold'>Choose Code Block</div>
            {/* <div className='relative h-14'>
                <TripleToggleSwitch labels={labels} onChange={handleChangeSwitch} />
            </div> */}
            {/* <CodeBlockList codeblocks={[codeblocks[currentSwitchPosition]]} lbl={currentSwitchPosition} /> */}
            {Object.entries(codeblocks).map(([level, codeblocks]) => (
                <CodeBlockList codeblocks={codeblocks} lbl={level} key={level} />
            ))}
        </div>
    )
}
