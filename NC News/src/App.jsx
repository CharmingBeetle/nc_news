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
        {/* <Route path="/articles" element={}/>  */}
        {/* <Route path="/articles/post" element={<PostArticle />}/> */}
        <Route path="/articles/:article_id" element={
          <>
          <Header />
          <Navbar />
          <SingleArticle />
          </>
          }
          />
        {/* <Route path="/articles/:article_id/comments" element={<ArticleComments />}/> */}
        {/* <Route path="/topics" element={<Topics />}/> */}
        {/* <Route path="/users" element={<UsersList />}/> */}
        {/* <Route path="/comments/:comment_id" element={<CommentCard />}/>  */}
       
    </Routes>
  )
}

export default App
