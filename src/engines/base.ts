import { RequestContextType } from '~/middlewares/context'
import { Logger } from '~/lib/logger/base'

export abstract class Engine {
  context: RequestContextType
  logger: Logger

  constructor(context: RequestContextType, logger: Logger) {
    if (!context) {
      throw new Error('Engines require a context to be set')
    }
    if (!logger) {
      throw new Error('Engines require a logger to be set')
    }
    this.context = context
    this.logger = logger
  }
}