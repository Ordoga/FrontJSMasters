import { httpService } from './http.service'

export const codeblockService = {
    query,
    getCodeblockById,
}

async function query() {
    const codeblocks = await httpService.get('codeblock')
    return codeblocks
}

async function getCodeblockById(codeblockId) {
    const codeblock = await httpService.get(`codeblock/${codeblockId}`)
    return codeblock
}
