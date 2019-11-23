import NextApp, { AppContext } from 'next/app'
import prepass from 'react-ssr-prepass'
import { getRequestContext, RequestContextType } from '~/middlewares/context'
import { handleHealthCheck } from '~/middlewares/health-check'
import { RootStateType } from '~/store/reducer'
import { getStore } from '~/store'
import { FetchDataFunction } from '~/types/data'

import Root from '~/root'

import { getLogger } from '~/lib/logger'
import { getServices } from '~/services'

type AppPropsType = {
  requestContext: RequestContextType
}

class App extends NextApp<AppPropsType> {
  static async getInitialProps({ AppTree, Component: C, router, ctx }: AppContext) {
    /* Handle Health Check */
    handleHealthCheck('/health')(ctx.req, ctx.res)
    if (ctx.res && ctx.res.finished) {
      return { pageProps: {}} // Bail early if request is done
    }

    const requestContext = getRequestContext(ctx.req, ctx.res)
    const logger = getLogger(requestContext)
    const services = getServices(requestContext, logger)
    logger.info(`GET ${router.pathname}`)
    const pageProps = C && C.getInitialProps ? await C.getInitialProps(ctx) : {}
    
    const store = getStore()

    if (typeof window === 'undefined') {
      await prepass(
        <AppTree pageProps={pageProps} requestContext={requestContext} />,
        (element: any, instance) => {
          const fetchData: FetchDataFunction<any> = element?.type?.fetchData
          if (fetchData && typeof fetchData === 'function') {
            const props = element?.props ?? {}
            return fetchData(props, {
              services,
              logger,
              store
            })
          }
        }
      )
    }

    return {
      pageProps,
      requestContext,
      state: store.getState()
    }
  }

  reduxState: RootStateType

  constructor(props) {
    super(props)

    this.reduxState = props.state
  }
  
  render() {
    const { Component, pageProps, requestContext } = this.props
    return (
      <Root requestContext={requestContext} state={this.reduxState}>
        <Component {...pageProps} />
      </Root>
    )
  }
}

export default App
