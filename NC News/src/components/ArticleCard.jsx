import SingleArticle from "./SingleArticle"
import { Link } from "react-router";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function ArticleCard({article}) {

    return (
            
        <article className="article-card">
            <Link to={`/articles/${article.article_id}`}>
                <h2 className="article-title">{article.title}</h2>
            </Link>
            <h3 className="article-author">- {article.author}</h3>
              
                
            <Link to={`/articles/${article.article_id}`}>
             <img className="article-img" src={article.article_img_url} alt={article.title}/>
            </Link>
            
            <h3 className="article-topic">{article.topic}</h3>
        </article>
    
          );
   } 

    
    



export default ArticleCard