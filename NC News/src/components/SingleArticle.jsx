import { getArticleById } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleComments from "./CommentsList";
import ArticleUpvote from "./ArticleUpvote";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    if (!article_id) {
      setError(new Error("missing article id"));
      setIsLoading(false);
      return;
    }

    getArticleById(article_id)
      .then((article) => {
        const loadedArticle = article.article || article;
        if (!loadedArticle) {
          setError(true);
        }
        setArticle(loadedArticle);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, [article_id]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Something went wrong!</span>;


  return (
    <>
      <article className="single-article">
        <div className="article-img-container">
          <img
            className="full-article-img"
            src={article.article_img_url}
            alt={`${article.title}`}
          />
        </div>
        <h1 className="full-article-title">{article.title}</h1>
        <h2 className="full-article-author">{article.author}</h2>
        <p className="full-article-body">{article.body}</p>
        <span className="full-article-votes">Likes: {article.votes}</span> <br />
        <ArticleUpvote
          article={article}
        />

        {/* COMMENTS */}
        <section>
          <span className="full-article-commentcount">
            Comments: {article.comment_count}
          </span>
        </section>
        <section>
          <span className="full-article-timestamp">
            Created: {`${article.created_at.slice(0,10)} at ${article.created_at.slice(11,16)} `}
          </span>
          <br />
        </section> <br />
        <ArticleComments />
      </article>
    </>
  );
}

export default SingleArticle;
