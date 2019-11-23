import React from 'react'
import { ServicesType } from '~/services/base'

export type ServiceContextType = ServicesType

export const ServiceContext = React.createContext<ServiceContextType | undefined>(undefined)

export const useServices = () => {
  const ctx = React.useContext(ServiceContext)
  if (!ctx) {
    throw new Error('useServices must be wrapped in a ServiceProvider!')
  }
  return ctx
}

export type ServiceProviderPropType = {
  services: ServiceContextType
}
export const ServiceProvider: React.FC<ServiceProviderPropType> = ({ services, children }) => {
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  )
}

export type ServiceConsumerPropType = {
  children: (services: ServiceContextType) => React.ReactNode
}
export const ServiceConsumer = ({ children }: ServiceConsumerPropType) => {
  const services = useServices()
  return children(services)
}