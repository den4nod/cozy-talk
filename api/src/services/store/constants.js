module.exports = {
  TABLES: {
    ARTICLES: 'articles',
    USERS: 'users',
    LIKED_ARTICLES: 'liked_articles',
    COMMENTS: 'comments',
    COMMENTS_TREEPATH: 'comments_treepath',
    AVATARS: 'avatars'
  },
  STATUS_CODES: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
  },
  CONSOLE_COLORS: {
    ERROR: '\x1b[31m%s\x1b[0m',
    WARNING: '\x1b[33m%s\x1b[0m',
    INFO: '\x1b[36m%s\x1b[0m',
    SUCCESS: '\x1b[32m%s\x1b[0m'
  }
}
