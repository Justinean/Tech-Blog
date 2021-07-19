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

router.get('/dashboard', withAuth, async (req, res) => {
    const user = req.session.name;
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

router.get('/dashboard/new', withAuth, (req, res) => {
    res.render('newblog', {session: req.session});
})

router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    let blog = await Blog.findByPk(req.params.id)
    res.render('editblog', {blog: blog.get({plain: true}), session: req.session});
})

router.get('/blog/:id', async (req, res) => {
    let blog = await Blog.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['name']
            },
        ]
    })
    let comments = await Comment.findAll({
        where: {blog_id: blog.id},
        include: [
            {
                model: User,
                attributes: ['name']
            },
        ]
    });
    
    comments = comments.map((comment) =>
        comment.get({ plain: true })
    );
    console.log(comments)
    res.render('blog', {blog: blog.get({plain: true}), comments, session: req.session});
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