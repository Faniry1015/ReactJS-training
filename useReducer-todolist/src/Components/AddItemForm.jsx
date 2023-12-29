import React, { useRef } from 'react'

function AddItemForm({onAddTodo}) {

    const addTodoRef = useRef(null)

    const handleAddTodo = (e) => {
        e.preventDefault()
        let newTodo = {
            id: Date.now(),
            completed: false
        }
        const newTodoData = new FormData(addTodoRef.current)
        newTodoData.forEach((todo, key) => {
            newTodo[key] = todo
        })
        onAddTodo(newTodo)
        addTodoRef.current.reset()
    }

    return (
        <div>
            <form ref={addTodoRef} onSubmit={handleAddTodo}>
                <div className="mb-3">
                    <label htmlFor="task" className="form-label">Nouvelle tâche</label>
                    <input type="text" className="form-control" id="task" name="task" aria-label="nouvelle tâche" />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    )
}

export default AddItemForm