import { useReducer, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoItem from './Components/TodoItem'
import AddItemForm from './Components/AddItemForm'
import UpdateItemForm from './Components/UpdateItemForm'

const reducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id) }
    case 'TOGGLE_COMPLETED':
      return {
        ...state, todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed }
          } else {
            return todo
          }
        })
      }
    case 'ADD':
      return { ...state, todos: [...state.todos, action.payload] }
    case 'UPDATE':
      return {
        ...state, todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return action.payload
          } else {
            return todo
          }
        })
      }
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {
    todos: [
      {
        id: 0,
        task: 'Tâche 1',
        completed: false
      }
    ]
  })

  const [updateFormIsVisible, setUpdateFormIsVisible] = useState(false)
  const [todoToUpdate, setTodoToUpdate] = useState(null)

  const handleUpdate = (todo) => {
    setTodoToUpdate(todo)
    setUpdateFormIsVisible(true)
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Todo list with useReducer</h1>
      <AddItemForm onAddTodo={(todo) => dispatch({ type: 'ADD', payload: todo })} />
      <hr />
      <label>Liste des tâches</label>
      <ul className="list-group">
        {state.todos.map(todo => <TodoItem key={todo.id} todo={todo} onRemove={() => dispatch({ type: 'REMOVE', payload: todo })} onToggleCompleted={() => dispatch({ type: 'TOGGLE_COMPLETED', payload: todo })} onUpdate={() => handleUpdate(todo)} />)}
      </ul>
      {updateFormIsVisible && <UpdateItemForm toUpdate={todoToUpdate} onSubmitUpdate={(updatedSubmit) => dispatch({ type: 'UPDATE', payload: updatedSubmit })} onCloseUpdateForm={() => setUpdateFormIsVisible(false)} />}
    </div>
  )
}

export default App
