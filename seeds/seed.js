const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  let i = 0;
  for (const blog of blogData) {
    const newBlog = await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    console.log(commentData[i])
    await Comment.create({
      content: commentData[i].content,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: newBlog.id
    })
    i++
  }
  process.exit(0);
};

seedDatabase();
