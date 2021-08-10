import React from 'react'
import { useMyHook } from 'use-xircus'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App