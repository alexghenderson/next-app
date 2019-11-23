import { RequestContextType } from '~/middlewares/context'
import { Logger } from '~/lib/logger/base'
import { ServicesType } from './base'

const getNodeServices = (
  requestContext: RequestContextType,
  logger: Logger
): ServicesType => {
  if (typeof window === 'undefined') {
    const NodeSampleService = require('./sample/node').default
    return {
      sample: new NodeSampleService(requestContext, logger)
    }
  }
  throw new Error('getNodeServices in web')
}

const getWebServices = (logger: Logger): ServicesType => {
  if (typeof window !== 'undefined') {
    const WebSampleService = require('./sample/web').default
    return {
      sample: new WebSampleService(logger)
    }
  }
  throw new Error('getWebServices in SSR')
}

export const getServices = (
  requestContext: RequestContextType,
  logger: Logger
): ServicesType => {
  if (typeof window === 'undefined') {
    return getNodeServices(requestContext, logger)
  }
  
  return getWebServices(logger)
}