

function ArticleCard({article}) {



    return (
        <article className="article-card">
            <img className="article-img" src={article.img_url} alt="article image"  />
            <h2 className="article-title">{article.title}</h2>
            <h3 className="article-topic">{article.topic}</h3>
            <h4 className="article-author">{article.author}</h4>
       
        </article>

    )
}


export default ArticleCard