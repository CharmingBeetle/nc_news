import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { UserContext } from "../contexts/User";
import { useContext, useEffect, useState } from "react";
import { getUserByUsername } from "../api";
import animation from "../assets/animation.json";
import Lottie from "lottie-react";
import Button from 'react-bootstrap/Button';


function UserCard({ username }) {
  const { loggedInUser } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const currentUser = username || loggedInUser.username;

    getUserByUsername(currentUser)
      .then((user) => {
        setUserData(user);
        setError(false);
      })
      .catch((err) => {
        console.log("Unable to fetch user", err);
        setError("Failed to load user data");
      })
      .finally(() => setIsLoading(false));
  }, [username, loggedInUser]);

  if (isLoading) return <Lottie animationData={animation} loop={true} autoplay={true} className="loading-animation" />;;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>User not found</div>;

  return (
  <section className="user-card">
  
  <Link to={`/users/${userData.username}`}>
    <Card 
    style={{ width: '18rem' }}>
      
      <Card.Img 
          className="user-img"
          src={userData.avatar_url}
          alt={userData.name}
        />
      
      <Card.Body>
        <Card.Title>{userData.username}</Card.Title>
        <Card.Text className="name">
        <h3 >{userData.name}</h3>
        </Card.Text>
       
      </Card.Body>
    </Card>
    </Link>
</section>
  )
}





export default UserCard;