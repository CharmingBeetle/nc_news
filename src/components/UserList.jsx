import { useState, useEffect } from "react"
import { getUsers } from "../api"
import UserCard from "./UserCard"
import animation from "../assets/animation.json"
import Lottie from "lottie-react"
import { Link } from "react-router-dom"

function UserList() {

    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(()=> {
        setIsLoading(true)
        setError(null)

        getUsers().then((userData)=> {
            setUserList(userData)
            setIsLoading(false)
        })
    },[])

    if(isLoading) return <Lottie animationData={animation} loop={true} autoplay={true} className="loading-animation" />;;
    if(error) return <span>Something went wrong!</span>
    
    return (
        <section>
            <h1>Users List</h1>
            {userList.map(user => {
            return <UserCard username={user.username} key={user.username}/>
        })
    }
        </section>
    )
}


export default UserList