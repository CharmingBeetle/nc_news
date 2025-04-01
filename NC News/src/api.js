import axios from 'axios'


const api = axios.create({
    baseURL: "https://nc-news-site.onrender.com/api"
})


function getArticles() {
    return api.get("/articles").then(({data})=> {
        return data.articles
    })
}


function getArticleById(article_id) {
    return api.get(`/articles/${article_id}`).then(({data:{article}})=> {
        return article
        
    })
}

function getCommentsByArticleId(article_id) {
    return api.get(`/articles/${article_id}/comments`).then(({data})=> {
        return data.comments
    })
}

function updateArticleVote(article_id) {
    return api.patch(`/articles/${article_id}`, {inc_votes:1 }).then(({data:{article}})=> {
        console.log(article.votes)
        return article.votes
    })
}


export { getArticles, getArticleById, getCommentsByArticleId, updateArticleVote  }