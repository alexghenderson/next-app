import { NextPage, NextPageContext } from 'next'
import React from 'react'

import { useServices } from '~/components/services'

import TestSample from '~/components/test-sample'

const Home: NextPage<{}> = () => {
  const services = useServices()
  return (
    <>
      <h1>Hello World</h1>
      <TestSample sliceKey="testing"/>
    </>
  )
}

export default Home
