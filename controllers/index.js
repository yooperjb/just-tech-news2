const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// prefix api route endpoints with /api
router.use('/api', apiRoutes);
// path to user-facing routes
router.use('/', homeRoutes);

// if request to any endpoint that doesn't exist throw 404 error
router.use(( req, res ) => {
    res.status(404).end();
});

module.exports = router;