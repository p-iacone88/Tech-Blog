const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// GET all authorized user's posts
router.get('/', withAuth, async (req, res) => {
    try {
        // Find user id along with all posts
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        // Pass user posts to the view then render into all posts
        const posts = postData.map((post) => post.get({
            plain: true
        }));
        res.render('allPostsAdmin', { layout: "dashboard", posts, });
        
    } catch (err) { // if withAuth fails...
        // If user has no active posts redirect to login
        res.redirect('login');
    }
});

// GET route

router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('newPost', { layout: 'dashboard' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({
                plain: true
            });
            res.render('editPost', { layout: 'dashboard', post, });
        } else {
            res.status(404).end(); // if bad req / id not found
        }
    } catch (err) {
        res.redirect('login'); // if withAuth fails
    }
});

module.exports = router;