import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export function UpdateTweetModal({ isVisible,currentTweet, onSubmitUpdate }) {
    const [tweet, setTweets] = useState(currentTweet)
    const updateTweetRef = useRef(null)

    const handleChange = (e) => {
            const input = e.target.name
            const updatedTweet = {...tweet, [input]: e.target.value}
            setTweets(updatedTweet)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmitUpdate(tweet)
    }
    const { name, content } = tweet

    return createPortal(
        <div className='fixed-top z-2  vh-100 d-flex align-items-center justify-content-center'>
            <form ref={updateTweetRef} onSubmit={handleSubmit} style={{ maxWidth: '600px' }} className="bg-dark text-white p-4 rounded position-relative" >
            <button onClick={() => isVisible()} type="button" className="btn-close text-white" aria-label="Close"></button>
                <h3>Mettre à jour le tweet</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nom</label>
                    <input type="text" value={name} onChange={handleChange} className="form-control" id="name" name="name" aria-label="nom" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Message</label>
                    <textarea value={content} onChange={handleChange} rows={3} className="form-control" id="content" name="content" required />
                </div>
                <button type="submit" className="btn btn-secondary float-end">Submit</button>
            </form>
        </div>,
        document.querySelector('body')
    )
}