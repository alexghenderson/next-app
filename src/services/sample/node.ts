import { SampleService } from './base'
import { RequestContextType } from '~/middlewares/context'
import { Logger } from '~/lib/logger/base'
import { SampleEngine } from '~/engines/sample'

export default class NodeSampleService extends SampleService {
  sampleEngine: SampleEngine
  context: RequestContextType
  logger: Logger

  constructor(context: RequestContextType, logger: Logger) {
    super()
    this.context = context
    this.logger = logger
    this.sampleEngine = new SampleEngine(context, logger)

    this.getUsers = this.getUsers.bind(this)
  }

  async getUsers() {
    const span = this.logger.trace('info', 'SampleService:getUsers')
    const result = this.sampleEngine.getUsers()
    span.end()
    return result
  }
}