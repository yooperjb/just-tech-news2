const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');

// prefix user routes with /users
router.use('/users', userRoutes);

// prefix post routes with /posts
router.use('/posts', postRoutes);

module.exports = router;