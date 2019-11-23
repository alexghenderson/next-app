import { RequestContextType } from '~/middlewares/context'
import { Logger, SpanType, MetaType } from './base'

import winston from 'winston'

class NodeLogger extends Logger {
  logger: any
  defaultMeta: MetaType

  constructor(context: RequestContextType) {
    super()
    this.defaultMeta = {
      correlationId: context.correlationId,
      method: context.method,
      path: context.path,
    }

    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      defaultMeta: this.defaultMeta,
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.colorize()
        })
      ]
    })

    // setup custom transports here if necessary
  }

  log(level: string, message: string, meta: MetaType = this.defaultMeta) {
    this.logger.log(level, message, meta)
  }

  trace(level: string, name: string, meta: MetaType = this.defaultMeta): SpanType {
    const trace = this.logger.startTimer()
    return {
      name: name,
      end: () => {
        trace.done({ message: name, level, ...meta})
      }
    }
  }

  error(message: string, meta?: MetaType) {
    this.log('error', message, meta)
  }

  warn(message: string, meta?: MetaType) {
    this.log('warn', message, meta)
  }

  info(message: string, meta?: MetaType) {
    this.log('info', message, meta)
  }

  verbose(message: string, meta?: MetaType) {
    this.log('verbose', message, meta)
  }

  debug(message: string, meta?: MetaType) {
    this.log('debug', message, meta)
  }

  silly(message: string, meta?: MetaType) {
    this.log('silly', message, meta)
  }
}

export default NodeLogger
