import { getArticleById } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleUpvote from "./ArticleUpvote";
import CommentsList from "./CommentsList";

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
        if (!article) {
          setError(true);
        }
        setArticle(article);
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
  if(!article) return <span>No article found!</span>


  return (
    <>
      <article className="single-article">
      <h1 className="full-article-title">{article.title}</h1><br />
        <div className="article-img-container">
          <img
            className="full-article-img"
            src={article.article_img_url}
            alt={`${article.title}`}
          />
        </div> <br />
        <p className="full-article-body">{article.body}</p>
      
            <h2 className="full-article-author">{article.author}</h2><br />
            <span className="full-article-timestamp">
                Created: {`${article.created_at.slice(0,10)} at ${article.created_at.slice(11,16)} `}
            </span><br />
            <span className="full-article-commentcount">
                Comments: {article.comment_count}
            </span><br />
          
        <ArticleUpvote
        article_id = {article_id}
          articleVotes={article.votes}
        />
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
