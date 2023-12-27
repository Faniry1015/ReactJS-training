import React from 'react'
import '../Styles/Tweet.css'

export function Tweet({ id, name, content, like, onDelete, onAddLike, onUpdate }) {

    const deleteTweet = () => {
        onDelete(id)
    }

    const AddLike = () => {
        onAddLike(id)
    }

    const update = () => {
        onUpdate(id)
    }
    return (
        <div className="col-sm-6 mb-3">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{content}</p>
                    <button onClick={AddLike} className="btn">❤️ {like}</button>
                    <button onClick={update} className="btn btn-secondary"> Modifier</button>
                    <button onClick={deleteTweet} type="button" className="btn-close" aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}

export default Tweet