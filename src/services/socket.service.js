import { io } from 'socket.io-client'

export const SOCKET_EVENT_ENTER_LOBBY = 'enter-lobby'
export const SOCKET_EVENT_ENTER_CODEBLOCK_PAGE = 'enter-codeblock-page'

export const SOCKET_EVENT_UPDATE_CODE = 'update-code'
export const SOCKET_EVENT_SET_ROLE = 'set-role'
export const SOCKET_EVENT_SET_USERS_IN_ROOM = 'set-users-in-room'
export const SOCKET_EVENT_MENTOR_LEFT = 'mentor-left'
export const SOCKET_EVENT_PROBLEM_SOLVED = 'problem-solved'
export const SOCKET_EVENT_RESET_CODE = 'reset-code'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://backjsmasters.onrender.com/' : '//localhost:3030'
export const socketService = createSocketService()

// To Change - This creates the socket the moment a user logs into the site
socketService.setup()

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        disconnect() {
            socket.disconnect()
        },
        off(eventName, cb = null) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
    }
    return socketService
}
