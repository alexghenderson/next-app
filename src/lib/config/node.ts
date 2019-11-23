import { NodeConfigType } from '~/lib/config/type'
import env from './env'

if (typeof window !== 'undefined') {
  throw new Error('Do not include node config in browser!')
}

const config: NodeConfigType = require(`./node/${env}`).default

export default config
