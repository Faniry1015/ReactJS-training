import React from 'react'

function TodoItem({ todo, onRemove, onToggleCompleted, onUpdate }) {
    return (
        <li className='list-unstyled'>
            <div className="input-group mb-3">
                <div className="input-group-text">
                    <input className="form-check-input mt-0" type="checkbox" checked={todo.completed} onChange={onToggleCompleted} aria-label="Checkbox for following text input" />
                </div>
                <div className="input-group-text">
                    {todo.task}
                </div>
                <button onClick={onUpdate} className="btn btn-warning">Modifier</button>
                <button onClick={onRemove} className="btn btn-danger">Effacer</button>
            </div>
        </li>
    )
}

export default TodoItem