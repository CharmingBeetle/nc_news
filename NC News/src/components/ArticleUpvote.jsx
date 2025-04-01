import { useState } from 'react'

function ArticleUpvote({article}) {
    const [votes, setVotes] = useState(0)

    function handleArticleUpvote(event) {
        event.preventDefault()
        setVotes(prevVotes=> prevVotes + 1)
    }

    return (
        <>
        <span><button onClick={handleArticleUpvote}>Like 👍</button></span>
        </>
    )
}


export default ArticleUpvote