import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const liveReloadPublic = __dirname + 'public'
export const views = __dirname + '/views/'
export const partials = __dirname + '/views/partials/'
