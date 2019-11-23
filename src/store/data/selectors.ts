import { DataSliceType, initialDataSlice, DataSliceStatus } from './slice'

export const getDataSlice = <T = any>(key) => (state): DataSliceType<T>  => {
  return state?.data?.[key] ?? { ...initialDataSlice }
}

export const getIsInProgress = <T = any>(slice: NonNullable<DataSliceType<T>>): boolean => {
  return slice.status === DataSliceStatus.inProgress
}

export const getIsSuccessful = <T = any>(slice: NonNullable<DataSliceType<T>>): boolean => {
  return slice.status === DataSliceStatus.success
}

export const getIsFailed = <T = any>(slice: NonNullable<DataSliceType<T>>): boolean => {
  return slice.status === DataSliceStatus.failed
}

export const getIsNotYetStarted = <T = any>(slice: NonNullable<DataSliceType<T>>): boolean => {
  return slice.status === DataSliceStatus.uninit
}

export const getResults = <T = any>(slice: NonNullable<DataSliceType<T>>): T => {
  return slice.results
}

export const getError = <T = any>(slice: NonNullable<DataSliceType<T>>): string => {
  return slice.error
}

export const getTimestamp = <T = any>(slice: NonNullable<DataSliceType<T>>): number => {
  return slice.timestamp
}

export const getHash = <T = any>(slice: NonNullable<DataSliceType<T>>): string => {
  return slice.hash
}