import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import ArticlesList from './components/ArticlesList'
import Navbar from './components/Navbar'
import Topics from './components/Topics'
import { Routes, Route } from 'react-router'
import SingleArticle from './components/SingleArticle'
import PostComment from './components/PostComment'
import UserList from './components/UserList'
import UserCard from './components/UserCard'
import { UserProvider } from './contexts/User'
import ArticlesTopic from './components/ArticlesTopic'
import SearchArticles from './components/SearchArticles';



function App() {
  

  return (
    <UserProvider>
      <Header/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ArticlesList />}/>
        <Route path="/articles" element={<SearchArticles />}/>
        <Route path="/articles/:article_id" element={<SingleArticle />}/>
        <Route path="/articles/topic/:topic" element={<ArticlesTopic />}/>
        <Route path="/topics" element={<Topics />}/>
        
        <Route path="/users" element={<UserList />}/>
        <Route path="/users/:username" element={<UserCard />}/>
    </Routes>
    </UserProvider>
  )
}

export default App
