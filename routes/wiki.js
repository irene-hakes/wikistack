const express = require('express');
const router = express.Router();
const {Page} = require('../models');
const {User} = require('../models');
const {addPage} = require('../views')
const wikipage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll({});
    // console.log(`pages from our wiki: ${pages}`)
    res.send(main(pages));
  } catch (error) { next(error)}
})

router.post('/', async (req, res, next) => {
  // const page = new Page({
  //   title: req.body.title,
  //   content: req.body.content
  // })

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    })

    const page = await Page.create(req.body);

    page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
    // console.log(page.dataValues);
  } catch (error) {next(error)}
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const user = await User.findOne({
      where: {
        id: page.authorId
      }
    })
    // console.log(page);
    res.send(wikipage(page, user))
  } catch (error) {next(error)}
})


module.exports = router;
