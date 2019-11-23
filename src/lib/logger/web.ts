import { Logger, MetaType, SpanType } from './base'

class WebLogger extends Logger {
  defaultMeta: Object
  consoleMap: { [level: string]: string }

  constructor() {
    super()

    this.consoleMap = {
      error: 'error',
      warn: 'warn',
      info: 'log',
      verbose: 'log',
      debug: 'debug',
      silly: 'log'
    }
  }

  log(level: string, message: string, meta: MetaType = {}) {
    console[this.consoleMap[level] || 'error'](message, { ...meta })
  }

  trace(level: string, name: string, meta: MetaType = {}): SpanType {
    const startTime = Date.now()
    return {
      name: name,
      end: () => {
        this.log(level, name, {...meta, durationMs: Date.now()-startTime})
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

export default WebLogger
