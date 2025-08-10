import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getSortedArticles } from "../api";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Error from "../error_handling/Error";
import animation from "../assets/animation.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';


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
    console.log(event);
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
        if (!articleData || articleData.length === 0) {
          setError({ status: 200, msg: "No articles found" });
        }
        setArticles(articleData || []);
      })
      .catch((error) => {
        const status = error.response.status || 500;
        setError({
          status,
          msg: status === 400 ? "Invalid sort" : "failed to load articles",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sort_by, order]);

  if (isLoading)
    return (
      <Lottie
        animationData={animation}
        loop={true}
        autoplay={true}
        className="loading-animation"
      />
    );
  if (error && error.status !== 200)
    return <Error status={error.status} msg={error.msg} />;

  return (

    <>
      <header>
        <h1>Sort Articles</h1>
      </header>
      <section className="sort-section">
        <Form.Select
          className="dropdown-sort"
          style={{ width: "30%" }}
          size="lg"
          name="sort_by"
          value={sort_by}
          onChange={setSortBy}
          aria-label="Default select example"
        >
          <option value="created_at">Date</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="topic">Topic</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </Form.Select>

        <Button type="input" size="lg" onClick={setSortOrder}>
          {order === "desc" ? "Desc" : "Asc"}
        </Button>
      </section>
      {error && error.status === 200 && <div>{error.mgs}</div>}
      <div className="articles-list">
        {articles.map((article) => (
            <Link to={`/articles/${article.article_id}`} key={article.article_id} className="article-link">
            <div className="search-result-card">
              <div className="result-image-container">
                <img 
                  src={article.article_img_url} 
                  alt={article.title}
                  className="result-image"
                />
              </div>
              <div className="result-content">
                <h3 className="result-title">{article.title}</h3>
                <div className="result-info">
                  <span className="result-author">by {article.author}</span>
                  <span className="result-topic">{article.topic.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
export default ArticleSort;


