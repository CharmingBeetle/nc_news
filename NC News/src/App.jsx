import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import ArticlesList from './components/ArticlesList'
import Navbar from './components/Navbar'
import Topics from './components/Topics'
import { Routes, Route } from 'react-router'
import SingleArticle from './components/SingleArticle'
import UserList from './components/UserList'
import UserCard from './components/UserCard'
import { UserProvider } from './contexts/User'
import ArticleSort from './components/SearchArticles';



function App() {
  

  return (
    <UserProvider>
      <Header/>
      <Navbar/>
   
      <Routes>
        <Route path="/" element={<ArticlesList />}/> 
        <Route path="/articles">
          <Route index element={<ArticlesList />}/>
          <Route path=":article_id" element={<SingleArticle />}/>
        </Route>
        <Route path="articles/search" element={<ArticleSort />}/>
        <Route path="/topics" element={<Topics />}/>
        <Route path="/users" element={<UserList />}/>
        <Route path="/users/:username" element={<UserCard />}/>
    </Routes>
    </UserProvider>
  )
}

export default App
