import { useState, useRef } from "react";
import { updateArticleVote } from "../api";

function ArticleUpvote({ articleVotes, article_id }) {
  const [optimisticVote, setOptimisticVote] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const isVoting = useRef(false);

  const handleArticleUpvote = async () => {
    if(isVoting.current) return;

    isVoting.current = true;
    setIsLoading(true);

    setOptimisticVote((currOptimisticVote) => currOptimisticVote + 1);

    try {
      await updateArticleVote(article_id);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError("Error. Vote not recorded.", err);
      setOptimisticVote((currOptimisticVote) => currOptimisticVote - 1);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Something went wrong!</span>;

  return (
    <>
      <span className="full-article-votes">
        Likes: {articleVotes + optimisticVote}
      </span>{" "}
      <br />
      <span>
        <button onClick={handleArticleUpvote} disabled={isLoading}>
          {isLoading ? "Voting..." : "Like 👍"}
        </button>
        {success && (
          <div className="article-success-vote">Thanks for your feedback.</div>
        )}
      </span>
    </>
  );
}

export default ArticleUpvote;
