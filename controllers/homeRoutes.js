const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll();    
    for (const i in blogs) {
        const user = await User.findByPk(blogs[i].user_id);
        const comments = await Comment.findAll({where: {blog_id: blogs[i].id}});
        blogs[i].dataValues.user = user;
        blogs[i].dataValues.comments = comments;
    }
    res.json(blogs);
})

module.exports = router;