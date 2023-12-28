import React, { useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Tweet from "./Components/Tweet";
import { UpdateTweetModal } from "./Components/UpdateTweetModal";


function App() {
  const defaultData = [
    {
      id: 1,
      name: "Faniry",
      content: "Ce site web est super cool",
      like: 1000
    },
    {
      id: 2,
      name: "Elisa",
      content: "Toujours faché",
      like: 0
    },
    {
      id: 3,
      name: "Ando",
      content: "Je suis le plus beau de la maison",
      like: 80
    },
    {
      id: 4,
      name: "Ndraina",
      content: "Je m'en fout, je veux juste jouer",
      like: 900
    },
  ]

  const [tweets, setTweets] = useState(defaultData)

  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [currentTweet, setCurrentTweet] = useState({})

  const newTweetRef = useRef(null)

  const handleDelete = (id) => {
    const currentTweets = tweets.filter(tweet => tweet.id !== id)
    setTweets(currentTweets)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTweet = {
      id: tweets.length + 1,
      like: 0,
    }
    const newTweetData = new FormData(newTweetRef.current)
    newTweetData.forEach((value, key) => {
      newTweet[key] = value
    })
    setTweets([...tweets, newTweet])
    newTweetRef.current.reset()
  }

  const handleAddLike = (tweetId) => {
    tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        tweet.like +=1
      }
    })
    setTweets([...tweets])
  }

  const handleClose = () => {
    setModalIsVisible(false)
  }

  const handleModalVisible = (id)  => {
    const tweetData = tweets.find(tweet => tweet.id === id)
    setCurrentTweet({...tweetData})
    setModalIsVisible(true)
  }

  const handleSubmitUpdate = (updatedTweet) => {
    const updatedTweets = tweets.map((tweet) => {
      if (updatedTweet.id === tweet.id) {
        return updatedTweet
      } else {
        return tweet
      }
    })
    setTweets([...updatedTweets])
    setModalIsVisible(false)
  }

  return <div className="container">
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

    <hr />

    <div className="row">
      {tweets.map(tweet => <Tweet key={tweet.id} id={tweet.id} name={tweet.name} content={tweet.content} like={tweet.like} onDelete={handleDelete} onAddLike={handleAddLike} onModalVisible={handleModalVisible}/>)}
    </div>
    {modalIsVisible && <UpdateTweetModal isVisible={handleClose} currentTweet={currentTweet} onSubmitUpdate={handleSubmitUpdate} />}
  </div>
}

export default App