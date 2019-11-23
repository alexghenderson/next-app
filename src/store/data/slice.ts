import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum DataSliceStatus {
  uninit = "uninit",
  inProgress = "in-progress",
  success = "complete-success",
  failed = "complete-failed"
}


export interface DataInterface {
  key: string,
}

export type ResetPayloadType = DataInterface

export type StartPayloadType = {
  hash: string,
  timestamp: number
} & DataInterface

export type StoreResultPayloadType = {
  results: any
} & DataInterface

export type StoreErrorPayloadType = {
  error: string
} & DataInterface

export type DataSliceType<T> = {
  status: NonNullable<DataSliceStatus>,
  hash: string,
  error: string,
  results: T,
  timestamp: NonNullable<number>
}

export const initialDataSlice: DataSliceType<any> = {
  status: DataSliceStatus.uninit,
  hash: null,
  error: null,
  results: null,
  timestamp: 0
}

const dataSlice = createSlice({
  name: 'Data',
  initialState: {},
  reducers: {
    storeResult(state, action: PayloadAction<StoreResultPayloadType>) {
      const { key, results } = action.payload
      if (!(key in state)) {
        state[key] = { ...initialDataSlice}
      }
      state[key].status = DataSliceStatus.success
      state[key].error = null
      state[key].results = results
    },
    storeError(state, action: PayloadAction<StoreErrorPayloadType>) {
      const { key, error } = action.payload
      if (!(key in state)) {
        state[key] = { ...initialDataSlice }
      }
      state[key].status = DataSliceStatus.failed
      state[key].error = error
    },
    start(state, action: PayloadAction<StartPayloadType>) {
      const { key, hash, timestamp } = action.payload
      if (!(key in state)) {
        state[key] = { ...initialDataSlice }
      }
      state[key].status = DataSliceStatus.inProgress
      state[key].hash = hash
      state[key].timestamp = timestamp
    },
    reset(state, action: PayloadAction<ResetPayloadType>) {
      const { key } = action.payload
      state[key] = { ...initialDataSlice }
    }
  }
})

export const {
  reset,
  start,
  storeResult,
  storeError
} = dataSlice.actions

export default dataSlice.reducer
