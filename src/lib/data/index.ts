import md5 from 'md5'
import { RootStateType } from '~/store/reducer'
import { getStore, AppDispatch, AppThunk } from '~/store'
import { getDataSlice, getTimestamp, getHash } from '~/store/data/selectors'
import * as dataActions from '~/store/data/slice'

export enum ResetType {
  never = "never",
  always = "always",
  sometimes = "sometimes"
}

export type RequestOptionsType = {
  reset: ResetType,
  ttl: number
}

export const createRequestAction = (
  key: string,
  props: any,
  fn: () => Promise<any>,
  opts: Partial<RequestOptionsType> = {}
): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootStateType) => {
    return doRequest(key, props, fn, { getState, dispatch }, opts)
  }
}

export const doRequest = async (
  key: string,
  props: any,
  fn: () => Promise<any>,
  store: ReturnType<typeof getStore> | { getState: () => RootStateType, dispatch: AppDispatch}, 
  opts: Partial<RequestOptionsType> = {}
) => {
  const {
    ttl = 5 * 60 * 1000,
    reset = ResetType.sometimes
  } = opts
  const { dispatch, getState } = store
  const slice = getDataSlice(key)(getState())
  const hash = md5(JSON.stringify(props))
  const timestamp = Date.now()
  if (timestamp - getTimestamp(slice) > ttl || hash !== getHash(slice)) {
    if (
      reset === ResetType.always ||
      (reset === ResetType.sometimes && hash !== getHash(slice))
    ) {
      dispatch(dataActions.reset({ key }))
    }

    dispatch(dataActions.start({ key, hash, timestamp }))
    try {
      const results = await fn()
      dispatch(dataActions.storeResult({ key, results }))
    } catch (err) {
      dispatch(dataActions.storeError({ key, error: err.toString() }))
    }
  }
}