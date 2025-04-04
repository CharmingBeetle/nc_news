import { getArticleById } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleUpvote from "./ArticleUpvote";
import CommentsList from "./CommentsList";
import Error from "../error_handling/Error";
import animation from "../assets/animation.json"
import Lottie from "lottie-react"

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!article_id) {
      setError({ status:400, msg:"Missing article id" });
      setIsLoading(false);
      return
    }

    getArticleById(article_id)
      .then((article) => {
        if (!article) {
          setIsLoading(true)
          setError({ status: 404, msg: "Article not found" });
        }
        setArticle(article);
        setIsLoading(false)
        setError(null);
      })
      .catch((error) => {
        const status =error.response.status || 500
        setError({status: status,
          msg: status === 404 ? "Article not found" : "Bad request"});
      })
      .finally(() => setIsLoading(false));
  }, [article_id]);

  if (isLoading) return <Lottie animationData={animation} loop={true} autoplay={true} className="loading-animation" />;;
  if (error) return <Error status={error.status} msg={error.msg}/>;
  if (!article) return <Error status={404} msg="Article not found" />;

  return (
    <>
      <article className="single-article">
        <h1 className="full-article-title">{article.title}</h1>
        <br />
        <div className="article-img-container">
          <img
            className="full-article-img"
            src={article.article_img_url}
            alt={`${article.title}`}
          />
        </div>{" "}
        <br />
        <p className="full-article-body">{article.body}</p>
        <h2 className="full-article-author">{article.author}</h2>
        <br />
        <section className="full-article-metrics">
        <span className="full-article-timestamp">
          Created:{" "}
          {`${article.created_at.slice(0, 10)} at ${article.created_at.slice(
            11,
            16
          )} `}
        </span>
        <br />
        <span className="full-article-commentcount">
          Comments: {article.comment_count}
        </span>
        <br />
        <ArticleUpvote article_id={article_id} articleVotes={article.votes} />
        <hr />
        </section>

        {/* COMMENTS */}
        <section>
          <CommentsList article={article} article_id={article_id} />
        </section>
      </article>
    </>
  );
}

export default SingleArticle;
