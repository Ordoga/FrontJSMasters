import { httpService } from './http.service'

export const codeblockService = {
    query,
}

async function query() {
    const codeblocks = await httpService.get('codeblock')
    return codeblocks
}
