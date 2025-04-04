
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
      
            getArticles(topic || undefined)
            .then((articles)=> {
                setArticles(articles || [])
                setError(false)
            })
            .catch((error)=>{
                console.log(error)
            })
            .finally(()=> setIsLoading(false))
            },[topic])

    if(isLoading) return <span>Loading...</span>;
    if(error) return <Error status={error.status} msg={error.msg} />;



    return (
        <section className="articles-titles">
            <h2>{topic ? `Articles on ${topic.toUpperCase()}` :"All Articles"}</h2>
            {articles.length ===0 && (<div>{topic ? `No articles found for ${topic}` : "No articles available"}</div>)}
                {articles.map((article)=> {
                    return <ArticleCard article={article} key={article.article_id}/>
                  
                })}
          
        </section>

    )
}


export default ArticlesList