module.exports = {
  TABLES: {
    ARTICLES: 'articles',
    USERS: 'users',
    LIKED_ARTICLES: 'liked_articles',
    COMMENTS: 'comments',
    COMMENTS_TREEPATH: 'comments_treepath'
  }
}

module.exports = {
  STATUS_CODES: {
    SUCCESS: 200,
    BAD_REQUEST: 400
  }
}

module.exports = {
  successJsonResponse: { status: 'success' },
  errorJsonResponse: (error) => {
    return { error: error }
  },
  apiResponse: (status, jsonPayload) => {
    return {
      status: status,
      jsonPayload: jsonPayload
    }
  }
}
