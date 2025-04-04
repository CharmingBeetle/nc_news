import { useContext, useState, useRef } from "react";
import { deleteComment } from "../api";
import { UserContext } from "../contexts/User";

function DeleteComment({ commentAuthor, comments, setComments, comment_id }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const isDeleting = useRef(false);

  const showDelete = loggedInUser.username === commentAuthor;

  const handleDeleteComment = (event) => {
    event.preventDefault();
    if (isDeleting.current) return;
    isDeleting.current = true;
    if (!comment_id) return;
    if(!loggedInUser.username) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const deletedComment = comments.find(
      (comment) => comment.comment_id === comment_id
    );

    setComments((previousComments) =>
      previousComments.filter(
        (comments) => comments.comment_id !== comment_id
      )
    );

    deleteComment(comment_id)
      .then(() => {
        setSuccess(true);
      })
      .catch((err) => {
        setComments((previousComments => [...previousComments, deletedComment])
        );
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
        <button
          className="cmt-del-btn"
          onClick={handleDeleteComment}
          disabled={isLoading}
        >
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
