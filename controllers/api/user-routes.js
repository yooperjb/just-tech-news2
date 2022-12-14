const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// GET /api/users
router.get( '/', (req, res)=> {
    // Access User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get( '/:id', (req, res)=> {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            // These are posts user has created
            {
                model: Post,
                attributes:['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            // These are posts user has voted on
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: `No user found with this id`});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// POST /api/users (create a new user)
router.post( '/', (req, res)=> {
    // expects {username, email, password}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })  
        // Save the user data to session
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// login route /api/users/login (user login)
router.post('/login', (req, res) => {
    // expects {email, password}
    console.log('email', req.body.email);
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user that email address!'});
            return;
        }

        // Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        // save user data to session
        req.session.save(() => {
            // declare session variables
            // i believe these are written to sessions table in db - session data is NOT saved in the cookie
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        }) 
    });
});

// logout route /api/users/logout (destroys session variables)
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT /api/users/1
router.put( '/:id', (req, res)=> {
    // expects {username, email, password}
    // if req.body has exact key/value pairs to match the model, you can just use 'req.body' instead
    User.update(req.body, {
        // hooks option required for beforeUpdate hook in User Model
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete( '/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with that id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router ;