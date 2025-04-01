import './App.css'
import Header from './components/Header'
import ArticlesList from './components/ArticlesList'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router'
import SingleArticle from './components/SingleArticle'



function App() {
  

  return (
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Navbar />
            <ArticlesList />
          </>
        } 
        />
        <Route path="/articles/:article_id" element={
          <>
          <Header />
          <Navbar />
          <SingleArticle />
          </>
          }
          />
       
    </Routes>
  )
}

export default App
