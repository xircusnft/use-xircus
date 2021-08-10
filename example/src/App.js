import React from 'react'
import useGlobal from './hooks/useGlobal';

const App = () => {
  const [state, actions] = useGlobal(['username'])

  return (
    <div>
      <h1>{state.username}</h1>
      <button onClick={() => actions.update()}>Update</button>
    </div>
  )
}
export default App
