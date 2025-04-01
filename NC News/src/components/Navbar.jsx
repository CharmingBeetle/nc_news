import { Link } from "react-router"

function Navbar() {
    


    return (
        <nav className="nab-bar">
            <ul className="nav-list">
                <li> <Link to="/">Home</Link></li>
                <li>Topics</li>
                <li><Link to="/users">Users</Link></li>
                <li>Search Articles</li>
               
            </ul>
        </nav>
      
    )
}


export default Navbar