import React from 'react'

function AddItemForm() {
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="newTask" className="form-label">Nouvelle tâche</label>
                <input type="email" className="form-control" id="newTask" name="newTask" aria-label="nouvelle tâche" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default AddItemForm