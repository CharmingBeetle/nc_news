import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getTopics } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import missingImg from "../assets/placeholder_img.png";
import Error from "../error_handling/Error";
import animation from "../assets/animation.json";
import Lottie from "lottie-react";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    setError(false)

    getTopics()
      .then((topics) => {
        if (!topics || topics.length === 0) {
          setError({ status: 200, msg: "No topics found" });
        }
        setTopics(topics || []);
        
      })
      .catch((error) => {
        const status = error.response.status || 500;
        setError({ status, msg: status === 404 ? "Topics not found" : "Failed to load topics" });
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Lottie animationData={animation} loop={true} autoplay={true} className="loading-animation" />;;
  if (error && error.status !==200) return <Error status={error.status} msg={error.msg} />;
  if (! error && topics.length === 0) return <Error status={404} msg="Topics not found" />;

  return (
    <>
    {error.status ===200 && (<div>{error.msg}</div>)}
      {topics.map((topic) => {
        return (
          <section className="topics-list" key={topic.slug}>
            <Card className="topic-card">
              <Card.Img
                variant="top"
                src={topic.img_url || missingImg}
                alt={topic.slug}
              />
              <Card.Body>
                <Card.Title>{topic.slug}</Card.Title>
                <Card.Text>{topic.description}</Card.Text>
                <Button className="topic-card-btn" variant="primary">
                  <Link to={`/articles?topic=${topic.slug}`}>Articles</Link>
                </Button>
              </Card.Body>
            </Card>
          </section>
        );
      })}
    </>
  );
}
export default Topics;
