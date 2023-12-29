import { useReducer, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoItem from './Components/TodoItem'
import AddItemForm from './Components/AddItemForm'
import UpdateItemForm from './Components/UpdateItemForm'
import { useTodos } from './Hooks/useTodos'

function App() {

  const {
    visibleTodos,
    addTodo,
    removeTodo,
    toggleCompleted,
    UpdateTodo,
    toggleShowCompleted,
    showCompleted
  } = useTodos()
 

  const [updateFormIsVisible, setUpdateFormIsVisible] = useState(false)
  const [todoToUpdate, setTodoToUpdate] = useState(null)

  const handleUpdate = (todo) => {
    setTodoToUpdate(todo)
    setUpdateFormIsVisible(true)
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Gestionnaire de tâches</h1>
      <AddItemForm onAddTodo={addTodo} />
      <hr />
      <h4>Liste des tâches</h4>
      <div className="form-check">
        <input className='form-check-input' type='checkbox' checked={showCompleted} onChange={toggleShowCompleted} /> 
        <label className='form-check-label'>Afficher les tâches complètes</label>
      </div>
      <ul className="list-group">
        {visibleTodos.map(todo => <TodoItem key={todo.id} todo={todo} onRemove={() => removeTodo(todo)} onToggleCompleted={() => toggleCompleted(todo)} onUpdate={() => handleUpdate(todo)} />)}
      </ul>
      {updateFormIsVisible && <UpdateItemForm toUpdate={todoToUpdate} onSubmitUpdate={UpdateTodo} onCloseUpdateForm={() => setUpdateFormIsVisible(false)} />}
    </div>
  )
}

export default App
