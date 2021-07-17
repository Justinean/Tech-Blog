const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require("../utils/auth")

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
    res.render('homepage', { blogs, session: req.session });
})

router.get('/dashboard/:user', withAuth, async (req, res) => {
    const user = req.params.user;
    const userData = await User.findOne({where: {name: user}})
    let blogs = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['name']
            },
        ],
        where: {user_id: userData.id}
    });
    blogs = blogs.map((blog) =>
        blog.get({ plain: true })
    );
    res.render('dashboard', { blogs, session: req.session });
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;