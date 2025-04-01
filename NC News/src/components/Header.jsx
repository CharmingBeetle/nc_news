import { useContext } from "react"
import { UserContext } from "../contexts/User"

function Header() {
    const {loggedInUser} = useContext(UserContext)
    return (
        <header>
            <h1>ThoughtBubble 💭</h1>
            <h2 className="welcome-msg">Welcome {loggedInUser.username}!</h2>
        </header>
    )
}


export default Header