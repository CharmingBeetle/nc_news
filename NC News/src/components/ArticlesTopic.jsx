import { useSearchParams } from "react-router-dom";
import { getArticlesByTopic } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ArticlesTopic() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic");

  useEffect(() => {
    if (!topic) return;

    setIsLoading(true);
    setError(false);

    getArticlesByTopic(topic)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Something went wrong!</span>;

  return (
    <section className="articles-topic">
      <h2>Articles on {topic}</h2>
      <ul className="article-list">
        {articles.map((article) => {
          return (
            <li className="article-item" key={article.article_id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={article.article_img_url} />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/articles/${article.article_id}`}>
                      {article.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>{article.author}</Card.Text>
                  <Button variant="primary">
                    <Link to={`/articles/${article.article_id}`}>Read</Link>
                  </Button>
                </Card.Body>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ArticlesTopic;
