import { useContext, useState, useRef } from "react";
import { postComment } from "../api";
import { UserContext } from "../contexts/User";

function PostComment({ article, comments, setComments }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const textareaRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (!body) {
      setError({ status: 400, msg: "Comment cannot be empty" });
      setIsLoading(false);
      setSuccess(false);
      return;
    }

    const optimisticComment = {
      comment_id: 123456789,
      body,
      author: loggedInUser.username,
      votes: 0,
      created_at: new Date().toISOString(),
    };

    setComments([optimisticComment, ...comments]);
    setBody("");

    postComment(article.article_id, {
      body: body,
      username: loggedInUser.username,
    })
      .then((newComment) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.comment_id === optimisticComment.comment_id
              ? newComment
              : comment
          )
        );
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
        textareaRef.current.focus();
      })
      .catch((error) => {
        setComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.comment_id !== optimisticComment.comment_id
          )
        );

        const status = error.response.status || 500;
        let errorMsg = "Failed to post comment";

        if (status === 400) {
          errorMsg = "Invalid comment. Try again.";
        } else if (status === 404) {
          errorMsg = "User not found in database";
        }
        setError({ status, msg: errorMsg });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePostComment = (event) => {
    setBody(event.target.value);
    if (error) {
      setError(null);
      setBody("");
      setIsLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="post-comment-form">
        <fieldset className="comment-fieldset">
          <legend className="comment-legend"> Share your thoughts</legend>
          <label>
            <textarea
              ref={textareaRef}
              className="comment-input"
              value={body}
              onChange={handlePostComment}
              placeholder="what's on your mind?"
              required
            />
          </label>
          <br />
          <button
            className="post-comment-btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post Comment"}
          </button>
        </fieldset>
      </form>
      {error && <div className="error-message">{error.msg}</div>}

      {success && (
        <div className="post-cmt-success-msg">Comment posted successfully!</div>
      )}
    </section>
  );
}
export default PostComment;
