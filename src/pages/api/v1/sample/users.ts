import { NextApiRequest, NextApiResponse } from 'next'
import { getRequestContext } from '~/middlewares/context'
import { getLogger } from '~/lib/logger'

import NodeSampleService from '~/services/sample/node'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const context = getRequestContext(req, res)
  const logger = getLogger(context)
  logger.info(`${req.method} ${req.url}`)

  const service = new NodeSampleService(context, logger)
  try {
    const result = await service.getUsers()
    res.json(result)
  } catch (err) {
    res.status(500)
    res.json({error: err.toString()})
  }
}