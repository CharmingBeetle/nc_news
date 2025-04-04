import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-site.onrender.com/api",
});

function getArticles(topic=null) {

    const query = topic ? {params: {topic}} : null
    
    return api.get("/articles", query).then(({ data }) => {
    return data.articles;
  });
}

function getArticleById(article_id) {
  return api.get(`/articles/${article_id}`).then(({ data: { article } }) => {
    return article;
  });
}

function getCommentsByArticleId(article_id) {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
}

function updateArticleVote(article_id) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then(({ data: { article } }) => {
      console.log(article.votes);
      return article.votes;
    });
}

function postComment(article_id, commentData) {
  return api
    .post(`/articles/${article_id}/comments`, {
      username: commentData.username,
      body: commentData.body,
    })
    .then(({ data: { newComment } }) => {
      console.log(newComment);
      return newComment;
    });
}

function getUsers() {
  return api.get("/users").then(({ data }) => {
    return data.users;
  });
}

function getUserByUsername(username) {
  return api.get(`/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
}

function deleteComment(comment_id) {
  return api
    .delete(`/comments/${comment_id}`, {})
    .then(() => {
      return ;
    });
}

function getTopics(){
    return api.get('/topics').then(({ data })=> {
        return data.topics
    })
}

function getArticlesByTopic(topic) {
    return api.get(`/articles?topic=${topic}`).then(({ data: { articles } })=> {
        console.log(articles)
        return articles
    })
}

function getSortedArticles(sort_by = 'created_at', order = 'desc') {
    return api.get('/articles', {
      params: { sort_by, order }
    })
    .then(({ data: { articles } }) => articles)
    .catch(err => {
        console.error('API Error:', err.response?.data);
        throw err;
})
}


export {
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  updateArticleVote,
  postComment,
  getUsers,
  getUserByUsername,
  deleteComment,
  getTopics, 
  getArticlesByTopic, 
  getSortedArticles
};
