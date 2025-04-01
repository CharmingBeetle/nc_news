import { useState } from 'react'
import { updateArticleVote } from '../api'

function ArticleUpvote({articleVotes, article_id}) {
    const [optimisticVote, setOptimisticVote] = useState(0)

    const handleArticleUpvote = () => {
        setOptimisticVote((currOptimisticVote)=> {
            return currOptimisticVote + 1
        })

        updateArticleVote(article_id).catch(()=> {
            setOptimisticVote((currOptimisticVote)=> {
            return currOptimisticVote - 1
        })
    })
    }
        

    return (
        <>
        <span className="full-article-votes">Likes: {articleVotes + optimisticVote}</span> <br />
        <span><button 
        onClick={handleArticleUpvote} 
        >Like 👍</button>
        </span>
        </>
    )
}


export default ArticleUpvote