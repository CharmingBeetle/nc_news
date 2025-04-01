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
        console.log(article)
        return article
        
    })
}

function getCommentsByArticleId(article_id) {
    return api.get(`/articles/${article_id}/comments`).then(({data})=> {
        console.log(data.comments)
        return data.comments
    })
}


export { getArticles, getArticleById, getCommentsByArticleId }