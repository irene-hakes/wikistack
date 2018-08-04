const express = require('express');
const router = express.Router();
const {userList, userPages} = require('../views');
const {User} = require('../models');
const {Page} = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {next(error)}
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const pages = await Page.findAll({
      where: {
        authorId: user.id
      }
    });
    res.send(userPages(user, pages));
  } catch (error) {next(error)}
})

module.exports = router;
