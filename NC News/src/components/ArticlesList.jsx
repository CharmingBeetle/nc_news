
import { getArticles } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"



function ArticlesList() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(()=> {
        setIsLoading(true)
        setError(false)

        getArticles().then((articles)=> {
            setArticles(articles)
            setIsLoading(false)
        })
    },[])

    if(isLoading) return <span>Loading...</span>;
    if(error) return <span>Something went wrong!</span>






    return (
        <section className="articles-titles">
            <h2>Articles List</h2>
          
                {articles.map((article)=> {
                    return <ArticleCard article={article} key={article.article_id}/>
                  
                })}
          
        </section>

    )
}


export default ArticlesList