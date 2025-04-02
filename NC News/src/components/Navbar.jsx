import { Link } from "react-router"

function Navbar() {
    


    return (

        <nav className="nab-bar">
            <ul className="nav-list">
                <li> <Link to="/">Home</Link></li>
                <li><Link to="/articles">Articles</Link></li>
                <li> <Link to='/topics'>Topics</Link></li>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/articles?sort_by=created_at&order=desc">Search Articles</Link></li>
               
            </ul>
        </nav>
      
    )
}


export default Navbar