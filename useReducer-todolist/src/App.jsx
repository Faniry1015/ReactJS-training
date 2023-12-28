import { useReducer, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoItem from './assets/Components/TodoItem'

function App() {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'REMOVE':
        return removeTodo()
    }
  }

  const [state, dispatch] = useReducer(reducer, {todos: [
    {
      id: 0,
      task: 'Aller au marcher',
      completed: false
    },
    {
      id: 2,
      task: 'Aller au se coucher',
      completed: false
    },
  ]}  )

  const removeTodo = () => {
    return {
      ...state, todos: state.todos.filter(todo => todo !== todo.payload )
    }
    
  } 

  return (
    <div className='container'>
    <h1>Todo list with useReducer</h1>
      <ul className="list-group">
        {todos.map(todo => <TodoItem todo={todo} onRemove={() => dispatch({type: 'REMOVE'})} />)}
      </ul>
    </div>
  )
}

export default App
