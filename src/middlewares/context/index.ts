import { IncomingMessage, ServerResponse } from 'http'
import { WebConfigType } from '~/lib/config/type'

export type RequestContextType = {
  path: string,
  method: string,
  correlationId: string
}

export const getRequestContext = (
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined
): RequestContextType => {
  if (typeof window === 'undefined') {
    if (req && res) {
      const uuid = require('uuid/v4')

      const env = process.env.APP_ENV ?? process.env.NODE_ENV ?? 'development'

      return {
        correlationId: uuid(),
        method: req.method,
        path: req.url
      }
    }
  }
  
  return null
}