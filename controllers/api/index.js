const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// prefix user routes with /users
router.use('/users', userRoutes);

// prefix post routes with /posts
router.use('/posts', postRoutes);

// prefix comment routes with /comments
router.use('/comments', commentRoutes);

module.exports = router;