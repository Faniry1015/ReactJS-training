import { useReducer, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { reducer } from './Components/reducer'
import TodoItem from './Components/TodoItem'
import AddItemForm from './Components/AddItemForm'
import UpdateItemForm from './Components/UpdateItemForm'

function App() {

  const [state, dispatch] = useReducer(reducer, {
    showCompleted: true,
    todos: [
      {
        id: 0,
        task: 'Tâche 1',
        completed: false
      }
    ]
  })
  const visibleTodos =  state.showCompleted ? state.todos : state.todos.filter(todo => !todo.completed)

  const [updateFormIsVisible, setUpdateFormIsVisible] = useState(false)
  const [todoToUpdate, setTodoToUpdate] = useState(null)

  const handleUpdate = (todo) => {
    setTodoToUpdate(todo)
    setUpdateFormIsVisible(true)
  }

  return (
    <div className='container'>
    {JSON.stringify(state)}
      <h1 className='text-center'>Todo list with useReducer</h1>
      <AddItemForm onAddTodo={(todo) => dispatch({ type: 'ADD', payload: todo })} />
      <hr />
      <h4>Liste des tâches</h4>
      <div className="form-check">
        <input className='form-check-input' type='checkbox' checked={state.showCompleted} onChange={() => dispatch({type:'TOGGLE_SHOW_COMPLETED'})} /> 
        <label className='form-check-label'>Afficher les tâches complètes</label>
      </div>
      <ul className="list-group">
        {visibleTodos.map(todo => <TodoItem key={todo.id} todo={todo} onRemove={() => dispatch({ type: 'REMOVE', payload: todo })} onToggleCompleted={() => dispatch({ type: 'TOGGLE_COMPLETED', payload: todo })} onUpdate={() => handleUpdate(todo)} />)}
      </ul>
      {updateFormIsVisible && <UpdateItemForm toUpdate={todoToUpdate} onSubmitUpdate={(updatedSubmit) => dispatch({ type: 'UPDATE', payload: updatedSubmit })} onCloseUpdateForm={() => setUpdateFormIsVisible(false)} />}
    </div>
  )
}

export default App
