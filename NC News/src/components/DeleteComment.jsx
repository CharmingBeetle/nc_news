import { useContext, useState } from "react";
import { deleteComment } from "../api";
import { UserContext } from "../contexts/User";

function DeleteComment({ commentAuthor, refreshComments, comment_id }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const showDelete = loggedInUser.username === commentAuthor;

  const handleDeleteComment = (event) => {
    event.preventDefault();
    if (!comment_id || !loggedInUser.username) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    deleteComment(comment_id)
      .then(() => {
        setSuccess(true);
        refreshComments();
      })
      .catch((err) => {
        setError("Unable to delete comment", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) return <span>Deleting...</span>;
  if (error) return <span>Something went wrong!</span>;

  return (
    <div className="del-cmt">
      {showDelete ? (
        <button onClick={handleDeleteComment} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      ) : null}
      {error && (
        <span className="del-cmt-error-msg">Error! Deletion failed.</span>
      )}
      {success && <span className="del-cmt-success-msg">Comment deleted!</span>}
    </div>
  );
}

export default DeleteComment;
