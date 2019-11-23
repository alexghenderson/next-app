import React from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { getDataSlice, getIsInProgress, getResults } from '~/store/data'
import { createRequestAction, ResetType } from '~/lib/data'
import { useLogger } from '~/components/logger'
import { useServices } from '~/components/services'

import * as sampleModels from '~/services/sample/models'
import { FDC } from '~/types/data'

type TestSamplePropsType = {
  sliceKey: string
}

const TestSample: FDC<TestSamplePropsType> = (props) => {
  const logger = useLogger()
  logger.debug('Rendering TestSample')
  const dispatch = useDispatch()
  const services = useServices()

  const slice = useSelector(getDataSlice<[sampleModels.User]>(props.sliceKey))

  const handleSometimesClick = React.useCallback(() => {
    dispatch(createRequestAction(props.sliceKey, props, services.sample.getUsers, { ttl: 0 }))
  }, [props.sliceKey])

  const handleAlwaysClick = React.useCallback(() => {
    dispatch(createRequestAction(props.sliceKey, props, services.sample.getUsers, { ttl: 0, reset: ResetType.always}))
  }, [props.sliceKey])

  return (
    <div>
      Users!
      {getResults(slice) && (
        <ul>
          {getResults(slice).map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAlwaysClick} disabled={getIsInProgress(slice)}>Fetch Users (force)</button>
      <button onClick={handleSometimesClick} disabled={getIsInProgress(slice)}>Fetch Users</button>
    </div>
  )
}

TestSample.fetchData = async (props, helpers) => {
  const { store, services, logger } = helpers
  const key = props?.sliceKey ?? 'default'
  return store.dispatch(createRequestAction(key, props, services.sample.getUsers))
}

export default TestSample
