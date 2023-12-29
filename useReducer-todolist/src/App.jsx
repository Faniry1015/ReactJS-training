import { useReducer } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoItem from './Components/TodoItem'
import AddItemForm from './Components/AddItemForm'

const reducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE':
      return {...state, todos: state.todos.filter(todo =>  todo.id !== action.payload.id)} 
    case 'TOGGLE_COMPLETED':
      return {...state, todos: state.todos.map(todo =>  {
        if (todo.id === action.payload.id) {
          return {...todo, completed: !todo.completed }
        } else {
          return todo
        }
      })} 
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {todos: [
    {
      id: 0,
      task: 'Aller au marcher',
      completed: false
    },
    {
      id: 1,
      task: 'Aller au se coucher',
      completed: false
    },
  ]}  )

  return (
    <div className='container'>
    {JSON.stringify(state.todos)}
    <h1>Todo list with useReducer</h1>
    <h2>Add new todo</h2>
    <AddItemForm />
    <h2>List</h2>
      <ul className="list-group">
        {state.todos.map(todo => <TodoItem key={todo.id} todo={todo} onRemove={() => dispatch({type: 'REMOVE', payload: todo})} onToggleCompleted={() => dispatch({type: 'TOGGLE_COMPLETED', payload: todo})} />)}
      </ul>
    </div>
  )
}

export default App
