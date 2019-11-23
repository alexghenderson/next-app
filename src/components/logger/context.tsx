import React from 'react'
import { Logger } from '~/lib/logger/base'

export type LoggerContextType = Logger
export const LoggerContext = React.createContext<LoggerContextType | undefined>(undefined)

export const useLogger = () => {
  const ctx = React.useContext(LoggerContext)
  if (!ctx) {
    throw new Error('useLogger must be wrapped in a LoggerProvider!')
  }
  return ctx
}

export type LoggerProviderPropType = {
  logger: LoggerContextType
}
export const LoggerProvider: React.FC<LoggerProviderPropType> = ({logger, children}) => {
  return (
    <LoggerContext.Provider value={logger}>
      {children}
    </LoggerContext.Provider>
  )
}

export type LoggerConsumerPropType = {
  children: (logger: LoggerContextType) => React.ReactNode
}
export const LoggerConsumer = ({ children }: LoggerConsumerPropType) => {
  const logger = useLogger()
  return children(logger)
}