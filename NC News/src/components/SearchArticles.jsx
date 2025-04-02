import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getSortedArticles } from "../api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ArticleSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const setSortOrder = (event) => {
    event.preventDefault();
    setSearchParams((prevOrder) => {
      const newParams = new URLSearchParams(prevOrder);
      newParams.set("order", order === "desc" ? "asc" : "desc");
      return newParams;
    });
  };

  const setSortBy = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSearchParams((prevSort) => {
      const newParams = new URLSearchParams(prevSort);
      newParams.set(name, value);
      return newParams;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getSortedArticles(sort_by, order)
      .then((articleData) => {
        setArticles(articleData);
      })
      .catch((err) => {
        setError("Failed to fetch articles", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sort_by, order]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Something went wrong!</span>;

  return (
    <>
      <div className="article-sort">
        <div className="sort-options">
          <select name="sort_by" value={sort_by} onChange={setSortBy}>
            <option value="created_at">Date</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="topic">Topic</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>

          <button onClick={setSortOrder}>
            {order === "desc" ? "Desc" : "Asc"}
          </button>
        </div>
      </div>

      <div className="articles-list">
        {articles.map((article) => (
           <section key={article.article_id}>
            <Card className="articles-list" style={{ width: "20rem" }}>
              <Card.Img
                variant="top"
                src={`${article.article_img_url}/100px180`}
              />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                 
                  <p>
                    By {article.author} | Topic: {article.topic}
                  </p>
                  <p>
                    Votes: {article.votes} | Comments: {article.comment_count}
                  </p>
               
                </Card.Text>
                <Button variant="primary">Read</Button>
              </Card.Body>
            </Card>
          </section>
        ))}
      </div>
    </>
  );
}

export default ArticleSort;

