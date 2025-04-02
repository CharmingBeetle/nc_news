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



function App() {
  

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Navbar />
            <ArticlesList />
          </>
        } 
        />
        <Route path="/articles" element={
          <>
          <Header />
          <Navbar />
          <ArticlesTopic />
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
          <Route path="/topics" element={
            <>
            <Topics />
            </>
            }
          />
          
          <Route path="/users" element={
            <>
            <UserList />
            </>
            }
          />
          <Route path="/users/:username" element={
            <>
            <UserCard />
            </>
            }
          />
       
    </Routes>
    </UserProvider>
  )
}

export default App
