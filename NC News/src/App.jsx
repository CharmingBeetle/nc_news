import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import ArticlesList from './components/ArticlesList'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router'

function App() {
  

  return (
    <>
      <div>
        <Header/>
        <Navbar />
        <ArticlesList />
        <Routes>
      {/* <Route path="/" element={<Welcome/>} /> */}
      {/* <Route path="/articles" element={<ArticlesList />}/> */}
      {/* <Route path="/articles/post" element={<PostArticle />}/>
      <Route path="/articles/:article_id" element={<ArticlesCard />}/>
      <Route path="/articles/:article_id/comments" element={<ArticleComments />}/>
      <Route path="/topics" element={<Topics />}/>
      <Route path="/users" element={<UsersList />}/>
      <Route path="/comments/:comment_id" element={<CommentCard />}/> */}
    </Routes>
        
      </div>
     
    </>
  )
}

export default App
