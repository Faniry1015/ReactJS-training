import React, { useEffect, useState } from 'react'

function useFetch(url) {
  const [state, setState] = useState({
    loading: true,
    items: []
  })

  useEffect(() => {
    (async () => {
      const response = await fetch(url)
      if (response.ok) {
        setState({
          items: await response.json(),
          loading: false
        })
      }
    })()
  }, [])


  return [state.loading, state.items]
}

function App() {

  const [loading, items] = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  console.log(items)

  if (loading) {
    return (
      <div>Chargement...</div>
    )
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => <tr>
            <td>{item.userId}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
          </tr>)}
        </tbody>
      </table>

    </div>
  )
}

export default App