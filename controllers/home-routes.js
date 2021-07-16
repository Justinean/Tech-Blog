const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', async (req, res) => {
    let blogs = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['name']
            },
        ]
    });
    blogs = blogs.map((blog) =>
        blog.get({ plain: true })
    );
    console.log(blogs)
    res.render('homepage', { blogs });
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
module.exports = router;