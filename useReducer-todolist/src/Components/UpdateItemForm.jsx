import React, { useRef } from 'react'
import { createPortal } from 'react-dom'

function UpdateItemForm({ toUpdate, onCloseUpdateForm, onSubmitUpdate }) {

    const updateTodoRef = useRef(null)

    let updatedTodo = {
        id: toUpdate.id,
        completed: toUpdate.completed
    }
    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        const updatedTodoData = new FormData(updateTodoRef.current)
        updatedTodoData.forEach((value, key) => {
            updatedTodo[key] = value
        })
        onSubmitUpdate(updatedTodo)
        onCloseUpdateForm()
    }

    return createPortal(
        <div className="position-fixed top-0 container d-flex align-items-center justify-content-center vh-100 z-2">
            <div className='bg-info p-4 w-50 position-relative'>
                <button type="button" onClick={onCloseUpdateForm} className="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>

                <form ref={updateTodoRef} onSubmit={handleSubmitUpdate}>
                    <div className="mb-3">
                        <h3 className="text-center">Mettre à jour la tâche</h3>
                        <input type="text" defaultValue={toUpdate.task} className="form-control" id="updateTask" name="task" aria-label="nouvelle tâche" />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary">Mettre à jour</button>
                    </div>
                </form>
            </div>
        </div>,
        document.querySelector('body')
    )
}

export default UpdateItemForm