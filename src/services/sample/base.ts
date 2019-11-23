import * as models from './models'

export abstract class SampleService {
  abstract getUsers(): Promise<[models.User]>
}

export default null