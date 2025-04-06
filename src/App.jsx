import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import ArticlesList from './components/ArticlesList'
import NavBar from './components/NavBar'
import Topics from './components/Topics'
import { Routes, Route } from 'react-router'
import SingleArticle from './components/SingleArticle'
import UserList from './components/UserList'
import UserCard from './components/UserCard'
import { UserProvider } from './contexts/User'
import ArticleSort from './components/SearchArticles';
import Error from './error_handling/Error';



function App() {
  

  return (
    <UserProvider>
      <Header/>
      <NavBar/>
   
      <Routes>
        <Route path="*" element={<Error status={404} msg="Page not found" />} />
        <Route path="/" element={<ArticlesList />}/> 
        <Route path="/articles">
          <Route index element={<ArticlesList />}/>
          <Route path=":article_id" element={<SingleArticle />}/>
        </Route>
        <Route path="articles/search" element={<ArticleSort />}/>
        <Route path="/topics" element={<Topics />}/>
        <Route path="/users" element={<UserList />}/>
        <Route path="/users/:username" element={<UserCard />}/>
        <Route path="/error" element={<Error />}/>
    </Routes>
    </UserProvider>
  )
}

export default App
