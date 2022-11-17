const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// render the handlebars homepage
router.get('/', (req, res) => {
    console.log("Session!", req.session);
    Post.findAll({
        attributes: [
            'id', 
            'post_url',
            'title',
            'created_at',
            [sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)`),
            'vote_count']
    ],
    include: [
        {
            model: Comment,
            attributes: ['id','comment_text','post_id','user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
    })
        .then(dbPostData => {
            // pass a single post object into the homepage template and serialize using plain:true
            // console.log(dbPostData[0]);
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// render the login page
router.get('/login', (req, res) => {
    // check for session, if exists redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login');
});

module.exports = router;