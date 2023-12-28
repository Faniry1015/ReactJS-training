import React, { useState } from 'react'

function useCont (initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue)

  const increment = () => {
    setCount(c => c + step)
  }

  return [count, increment]
}

function App() {

  const [count, increment] = useCont(10)

  return (
    <div>
        <button onClick={increment}>Incrémenter: {count}</button>
    </div>
  )
}

export default App