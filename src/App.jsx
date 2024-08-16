/* eslint-disable no-unused-vars */
import React from 'react'
import Search_bar from './search'
import Test from './Api/test'
import init from './Api/init'
import { Wows_numbers_api } from './contents/content'

function App() {
  const i = init()
  console.log('App的i：'+i)

  return (
    <Wows_numbers_api.Provider value={{i}}>
     <Search_bar />
    </Wows_numbers_api.Provider>
  )
}

export default App
