import { httpService } from './http.service'

export const codeblockService = {
    query,
    getCodeblockById,
}

async function query() {
    try {
        const codeblocks = await httpService.get('codeblock')
        return codeblocks
    } catch (err) {
        console.log(err)
    }
}

async function getCodeblockById(codeblockId) {
    try {
        const codeblock = await httpService.get(`codeblock/${codeblockId}`)
        return codeblock
    } catch (err) {
        console.log(err)
    }
}
