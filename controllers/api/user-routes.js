const router = require('express').Router();
const { User, Blog } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post('/dashboard/:user/new', async (req, res) => {
    let name = req.body.name;
    let content = req.body.content;
    let user = req.params.user;
    console.log(name, content, user)
    const userId = await User.findOne({where: {name: user}})
    console.log(userId)
    const blog = await Blog.create({
        name,
        content,
        user_id: userId.id
    })
    console.log(blog)
})

module.exports = router;