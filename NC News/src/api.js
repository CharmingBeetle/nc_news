import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-site.onrender.com/api",
});

function getArticles() {
  return api.get("/articles").then(({ data }) => {
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

function deleteComment(comment_id, commentData) {
  return api
    .delete(`/comments/${comment_id}`, { commentData })
    .then(({ data }) => {
      return data;
    });
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
};
