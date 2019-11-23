import ky from 'ky-universal'
import * as models from '~/services/sample/models'
import { RequestContextType } from '~/middlewares/context'
import { Logger } from '~/lib/logger/base'
import { Engine } from '../base'

export class SampleEngine extends Engine {
  constructor(context: RequestContextType, logger: Logger) {
    super(context, logger)
  }

  async getUsers() {
    const result: [models.User] = await ky.get('https://jsonplaceholder.typicode.com/users').json()
    return result
  }
}