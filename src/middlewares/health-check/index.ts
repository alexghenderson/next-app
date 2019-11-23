import { IncomingMessage, ServerResponse } from 'http'

export const handleHealthCheck = (
  path: string
) => (
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (req && res) {
    if (req.url === path) {
      res.statusCode = 200
      res.write('OK')
      res.end()
    }
  }
}