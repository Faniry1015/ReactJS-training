import React from 'react'

function TodoItem({ todo, completed, onRemove, onToggleCompleted }) {
    return (
        <li className='list-unstyled'>
            <div className="input-group mb-3">
                <div className="input-group-text">
                    <input className="form-check-input mt-0" type="checkbox" value={completed} onChange={onToggleCompleted} aria-label="Checkbox for following text input" />
                </div>
                <div className="input-group-text">
                    {todo.task}
                </div>
                <button onClick={onRemove} className="btn btn-secondary">Effacer</button>
            </div>
        </li>
    )
}

export default TodoItem