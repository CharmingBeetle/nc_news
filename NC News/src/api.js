import axios from 'axios'


const api = axios.create({
    baseURL: "https://nc-news-site.onrender.com/api"
})


function getArticles() {
    return api.get("/articles").then(({data})=> {
        return data.articles
    })
}



export { getArticles }