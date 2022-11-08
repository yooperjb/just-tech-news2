const router = require('express').Router();
const userRoutes = require('./user-routes.js');

// prefix user routes with /users
router.use('/users', userRoutes);

module.exports = router;