import { useState, useRef } from "react";
import { updateCommentVotes } from "../api";

function CommentUpvote({ commentVotes, comment_id }) {
  const [opCommentVote, setOpCommentVote] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const isVoting = useRef(false);

  const handleCommentUpvote = async () => {
    if(isVoting.current) return;
    isVoting.current = true;
    setIsLoading(true);

    setOpCommentVote((currCommentVote) => currCommentVote + 1);

    try {
      await updateCommentVotes(comment_id);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError("Error. Vote not recorded.", err);
      setOpCommentVote((currCommentVote) => currCommentVote - 1);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="loading-like">💭...</div>;
  if (error) return <span>Something went wrong!</span>;

  return (
    <>
    <span>
        <div className="comment-vote">
      <h5 className="comment-votes">Votes: {commentVotes + opCommentVote}</h5>
        <button className="comment-like-btn" onClick={handleCommentUpvote} disabled={isLoading}>
          {isLoading ? "💭..." : "Like"}
        </button>
        </div>
        {success && (
            <>
          <div className="comment-success-vote">You liked this comment!</div><br />
          </>
        )} 
      </span>
    </>
  );
}

export default CommentUpvote;
