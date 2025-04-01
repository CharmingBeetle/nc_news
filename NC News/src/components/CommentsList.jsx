import { getCommentsByArticleId } from "../api"
import { useState, useEffect } from "react"
import { Link } from "react-router"
import PostComment from "./PostComment"


function CommentsList({article_id, article}) {

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [refresh, setRefresh] = useState(0)

    const refreshComments=()=>{
        setRefresh(prevRender => prevRender +1)
    }

    useEffect(()=> {
     
        if (!article_id) {
            setError(true);
            setIsLoading(false);
          }
        setIsLoading(true)
        setError(false)

        getCommentsByArticleId(article_id)
        .then((comments)=> {
            if (!comments) {
              setError(true);
            }
            setComments(comments)
            setIsLoading(false)

        }).catch((err)=> {
            setError(err)
            setIsLoading(false)
        })
        
    },[article_id, refresh])


    if(isLoading) return <span>Comments loading...</span>;
    if(error) return <span>Something went wrong!</span>

   

    return (
        <section className="comments-section">
            <PostComment article={article} refreshComments={refreshComments}/>
            <h3>Comments for this article:</h3>
            
            {comments.map(comment=> (
                     <div className="comment-list" key={comment.comment_id}>
                        <h4>{comment.body}</h4>
                        <h5>User: {comment.author}</h5>
                        <h5>Votes: {comment.votes}</h5>
                        <h6>Created: {`${comment.created_at.slice(0,10)} at ${comment.created_at.slice(11,16)}`}</h6>
                        <button className="comment-like-btn">Like</button>
                    
                        <hr />
                     </div>
                     
                ))}
        </section>
    )
}


export default CommentsList