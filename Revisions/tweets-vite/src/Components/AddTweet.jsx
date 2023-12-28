import React, { useRef } from 'react'

export function AddTweet({onNewTweet}) {

    const newTweetRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newTweet = {}
        const newTweetData = new FormData(newTweetRef.current)
        newTweetData.forEach((value, key) => {
          newTweet[key] = value
        })
        onNewTweet(newTweet)
        newTweetRef.current.reset()
      }

    return (
        <form ref={newTweetRef} onSubmit={handleSubmit} style={{ maxWidth: '300px' }} >
            <h3>Nouveau tweet</h3>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input type="text" className="form-control" id="name" name="name" aria-label="nom" required />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Message</label>
                <textarea type="text" rows={3} className="form-control" id="content" name="content" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}