import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Tweet from "./Components/Tweet";
import { UpdateTweetModal } from "./Components/UpdateTweetModal";
import { AddTweet } from "./Components/AddTweet";


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

  const handleDelete = (id) => {
    const currentTweets = tweets.filter(tweet => tweet.id !== id)
    setTweets(currentTweets)
  }

  const handleNewTweet = (newTweet) => {
    const tweet = {
      id: tweets.length + 1,
      like: 0,
      ...newTweet
    }
    setTweets([...tweets, tweet])
  }

  const handleAddLike = (tweetId) => {
    const likedTweet = tweets.find((tweet) => tweet.id === tweetId)
    likedTweet.like += 1
    setTweets([...tweets])
  }

  const handleCloseModal = () => {
    setModalIsVisible(false)
  }

  const handleModalVisible = (id) => {
    const tweetData = tweets.find(tweet => tweet.id === id)
    setCurrentTweet({ ...tweetData })
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
    <AddTweet onNewTweet={handleNewTweet} />
    <hr />
    <div className="row">
      {tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} onDelete={handleDelete} onAddLike={handleAddLike} onModalVisible={handleModalVisible} />)}
    </div>
    {modalIsVisible && <UpdateTweetModal isVisible={handleCloseModal} currentTweet={currentTweet} onSubmitUpdate={handleSubmitUpdate} />}
  </div>
}

export default App