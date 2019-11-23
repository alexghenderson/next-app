import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { getStore } from '~/store'
import { getServices } from '~/services'
import { getLogger } from '~/lib/logger'

import { LoggerProvider } from '~/components/logger'
import { ServiceProvider } from '~/components/services'

import { RequestContextType } from '~/middlewares/context'
import { RootStateType } from '~/store/reducer'


export type RootPropsType = {
  requestContext: RequestContextType,
  state: RootStateType
}

const NodeRoot: React.FC<RootPropsType> = ({
  requestContext, state, children }) => {
  const {
    services,
    logger,
    store
  } = React.useMemo(() => {
    const logger = getLogger(requestContext)
    const services = getServices(requestContext, logger)
    const store = getStore(state)
    return { services, logger, store }
  }, [])

  return (
    <StoreProvider store={store}>
      <LoggerProvider logger={logger}>
        <ServiceProvider services={services}>
          {children}
        </ServiceProvider>
      </LoggerProvider>
    </StoreProvider>
  )
}

export default NodeRoot
