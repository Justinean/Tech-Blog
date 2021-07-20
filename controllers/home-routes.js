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
    blogs = blogs.map((blog) => {
        blog = blog.get({plain: true});
        blog.user.name = blog.user.name[0].toUpperCase() + blog.user.name.slice(1);
        return blog;
    });
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
    blogs = blogs.map((blog) => {
        blog = blog.get({plain: true});
        blog.user.name = blog.user.name[0].toUpperCase() + blog.user.name.slice(1);
        return blog;
    });
    res.render('dashboard', { blogs, session: req.session });
})

router.get('/dashboard/new', withAuth, (req, res) => {
    res.render('newblog', {session: req.session});
})

router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    let blog = await Blog.findByPk(req.params.id)
    const user = await User.findOne({where: {name: req.session.name}})
    if (blog) {
        if (user.id === blog.user_id) {
            res.render('editblog', {blog: blog.get({plain: true}), session: req.session});
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
    
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
    
    comments = comments.map((comment) => {
        comment = comment.get({ plain: true });
        comment.user.name = comment.user.name[0].toUpperCase() + comment.user.name.slice(1);
        return comment;
    });
    console.log(comments)
    blog = blog.get({plain: true})
    blog.user.name = blog.user.name[0].toUpperCase() + blog.user.name.slice(1);
    res.render('blog', {blog, comments, session: req.session});
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