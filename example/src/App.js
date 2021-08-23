import React from 'react'
import { useGlobal } from 'use-xircus';

const App = () => {
  const [state, actions] = useGlobal(['username'])

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => actions.update()}>Update</button>
    </div>
  )
}
export default App
