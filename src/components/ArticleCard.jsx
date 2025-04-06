import { Link } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ArticleCard({ article }) {
  return (
    <Card className="article-card" style={{ width: "25rem" }}>
      <Link to={`/articles/${article.article_id}`}>
            <h4 className="article-title"></h4>
         
      <Card.Img
        variant="top"
        src={`${article.article_img_url}/100px180`}
        alt={article.title}
      />
       </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/articles/${article.article_id}`}>
            <h2 className="article-title">{article.title}</h2>
          </Link>
        </Card.Title>
        <Card.Text>
          <p className="article-author"> by {article.author}</p>
          <p className="article-topic">{article.topic.toUpperCase()}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;
