import { SampleService } from './base'
import { Logger } from '~/lib/logger/base'
import * as models from './models'
import ky from 'ky-universal'

export default class WebSampleService extends SampleService {
  logger: Logger

  constructor(logger) {
    super()
    this.logger = logger

    this.getUsers = this.getUsers.bind(this)
  }

  async getUsers() {
    const span = this.logger.trace('info', 'SampleService:getUsers')
    const result = await ky.get('/api/v1/sample/users').json<[models.User]>()
    span.end()
    return result
  }
}