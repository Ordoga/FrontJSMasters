import { io } from 'socket.io-client'

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
    }
    return socketService
}
