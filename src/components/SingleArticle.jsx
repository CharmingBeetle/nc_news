import { getArticleById } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleUpvote from "./ArticleUpvote";
import CommentsList from "./CommentsList";
import Error from "../error_handling/Error";
import animation from "../assets/animation.json";
import Lottie from "lottie-react";
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!article_id) {
      setError({ status: 400, msg: "Missing article id" });
      setIsLoading(false);
      return;
    }

    getArticleById(article_id)
      .then((article) => {
        if (!article) {
          setIsLoading(true);
          setError({ status: 404, msg: "Article not found" });
        }
        setArticle(article);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        const status = error.response.status || 500;
        setError({
          status: status,
          msg: status === 404 ? "Article not found" : "Bad request",
        });
      })
      .finally(() => setIsLoading(false));
  }, [article_id]);

  if (isLoading)
    return (
      <Lottie
        animationData={animation}
        loop={true}
        autoplay={true}
        className="loading-animation"
      />
    );
  if (error) return <Error status={error.status} msg={error.msg} />;
  if (!article) return <Error status={404} msg="Article not found" />;

  return (
    <>
      {/* IMAGE */}
      <article className="single-article">
        <div className="article-content-container">
          <div className="article-img-container">
            <img
              className="full-article-img"
              src={article.article_img_url}
              alt={`${article.title}`}
            />
          </div>

          {/* ARTICLE CONTENT */}
          <div className="article-text-content">
            <h1 className="full-article-title">{article.title}</h1>
            <span className="full-article-author">By {article.author}</span>
            <p className="full-article-body">{article.body}</p>

            {/* METRICS */}
            <section className="full-article-metrics">
              <span className="full-article-timestamp">
                Created:{" "}
                {`${article.created_at.slice(
                  0,
                  10
                )} at ${article.created_at.slice(11, 16)}`}
              </span>
              <span className="full-article-commentcount">
                Comments: {article.comment_count}
              </span>

              {/* VOTES */}
              <ArticleUpvote
                article_id={article_id}
                articleVotes={article.votes}
              />
            </section>
          </div>
        </div>

        <hr />

        {/* COMMENTS */}
        <section>
          <CommentsList article={article} article_id={article_id} />
        </section>
      </article>
    </>
  );
}

export default SingleArticle;
