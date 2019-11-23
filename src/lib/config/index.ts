import { WebConfigType } from '~/lib/config/type'
import env from './env'

const config: WebConfigType = require(`./web/${env}`).default

export default config
