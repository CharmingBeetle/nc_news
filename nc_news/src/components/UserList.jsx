import { useState, useEffect } from "react"
import { getUsers } from "../api"
import UserCard from "./UserCard"

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

    if(isLoading) return <span>Loading...</span>;
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