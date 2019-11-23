import { FC } from 'react'
import { getStore } from '~/store'
import { Logger } from '~/lib/logger/base'
import { ServicesType } from '~/services/base'

export type FetchDataFunctionProps = {
  services: ServicesType,
  logger: Logger,
  store: ReturnType<typeof getStore>
}

export type FetchDataFunction<T> = (props: T, helpers: FetchDataFunctionProps) => Promise<any>
export type FDC<T> = FC<T> & { fetchData: FetchDataFunction<T> }
