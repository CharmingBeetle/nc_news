import { useContext, useState } from "react";
import { postComment } from "../api";
import { UserContext } from "../contexts/User";

function PostComment({ article, refreshComments }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!body) return;
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    postComment(article.article_id, {
      body: body,
      username: loggedInUser.username || "jessJelly",
    })
      .then(() => {
        setBody("");
        setSuccess(true);
        refreshComments();
      })
      .catch((err) => {
        setError("Post unsuccessful. Refresh page to try again.", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePostComment = (event) => {
    setBody(event.target.value);
  };

  console.log(body);
  if (isLoading) return <span>Posting...</span>;
  if (error) return <span>Something went wrong!</span>;

  return (
    <section>
      <form onSubmit={handleSubmit} className="post-comment-form">
        <fieldset>
          <legend> Share your thoughts</legend>
          <label>
            <textarea
              className="comment-input"
              value={body}
              onChange={handlePostComment}
              placeholder="what's on your mind?"
              required
            />
          </label>
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Posting..." : "Post Comment"}
          </button>
        </fieldset>
        <br />
      </form>
      {error && <span className="post-cmt-success-msg">Error! Post failed.</span>}
      {success && (
        <span className="post-cmt-success-msg">Comment posted successfully!</span>
      )}
    </section>
  );
}

export default PostComment;
