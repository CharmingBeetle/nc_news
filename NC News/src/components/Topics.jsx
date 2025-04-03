import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getTopics } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import missingImg from '../assets/placeholder_img.png'

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);



  useEffect(() => {
    getTopics()
      .then((topic) => {
        setTopics(topic);
        setError(false);
      })
      .catch((err) => {
        setError("Failed to load topic data", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading topics...</div>;
  if (error) return <div>{error}</div>;
  if (!topics) return <div>Topic not found</div>;


  return (
<>
      {topics.map((topic) => {
          return (
            <section className='topics-list' key={topic.slug}>
            <Card className='topic-card'>
              <Card.Img variant="top" src={topic.img_url || missingImg} alt=""/>
              <Card.Body>
                <Card.Title>{topic.slug}</Card.Title>
                <Card.Text>
                  {topic.description}
                </Card.Text>
                <Button className="topic-card-btn" variant="primary"><Link to={`/articles?topic=${topic.slug}`}>Articles</Link></Button>
              </Card.Body>
            </Card>
             </section>
          );
        }
      )}
      </>
  )

}
export default Topics;
