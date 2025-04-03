
import { getArticles } from "../api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import { useSearchParams } from "react-router-dom"


function ArticlesList() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams] = useSearchParams()
    const topic = searchParams.get("topic")

    useEffect(()=> {
    
        setIsLoading(true)
        setError(null)
      
            getArticles(topic || null)
            .then(setArticles)
            .catch((err)=>{
                setError("Something went wrong!", err)
            })
            .finally(()=> setIsLoading(false))
            },[topic])

    if(isLoading) return <span>Loading...</span>;
    if(error) return <span>Something went wrong!</span>



    return (
        <section className="articles-titles">
            <h2>{topic ? `Articles on ${topic.toUpperCase()}` :"All Articles"}</h2>
          
                {articles.map((article)=> {
                    return <ArticleCard article={article} key={article.article_id}/>
                  
                })}
          
        </section>

    )
}


export default ArticlesList