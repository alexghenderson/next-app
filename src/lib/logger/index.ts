import { RequestContextType } from '~/middlewares/context'
import { Logger } from './base'

const getNodeLogger = (
  requestContext: RequestContextType
): Logger => {
  if (typeof window === 'undefined') {
    const NodeLogger = require('./node').default
    return new NodeLogger(requestContext)
  }
  throw new Error('getNodeLogger in web')
}

const getWebLogger = (): Logger => {
  if (typeof window !== 'undefined') {
    const WebLogger = require('./web').default
    return new WebLogger()
  }
  throw new Error('getWebLogger in SSR')
}

export const getLogger = (
  requestContext: RequestContextType
): Logger => {
  if (typeof window === 'undefined') {
    return getNodeLogger(requestContext)
  }

  return getWebLogger()
}