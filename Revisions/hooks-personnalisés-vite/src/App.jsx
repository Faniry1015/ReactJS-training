import React, { useEffect, useState } from 'react'

function useFetch(url) {
  const [state, setState] = useState({
    loading: true,
    items: []
  })

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          setState({
            items: await response.json(),
            loading: false
          })
        }
      } catch(e) {
        console.error('Erreur de chargement des données', {message: e})
      }
    })()
  }, [])


  return [state.loading, state.items]
}

function App() {

  const [loading, items] = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=15')

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
          {items.map(item => <tr key={item.id}>
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