import { Link } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ArticleCard({ article }) {
  return (
    <Card className="article-card" style={{ width: "25rem" }}>
      <Card.Img
        variant="top"
        src={`${article.article_img_url}/100px180`}
        alt={article.title}
      />
      <Card.Body>
        <Card.Title>
          <Link to={`/articles/${article.article_id}`}>
            <h2 className="article-title">{article.title}</h2>
          </Link>
        </Card.Title>
        <Card.Text>
          <p className="article-author"> - {article.author}</p>
          <p className="article-topic">{article.topic}</p>
        </Card.Text>
        <Button className="article-card-btn" variant="primary">
          <Link to={`/articles/${article.article_id}`}>
            <h4 className="article-title">Read</h4>
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;
