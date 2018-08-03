const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 1337;

const init = async () => {
  await models.db.sync({force: true});

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  })
}

init();

app.get('/', (req, res) => {
  res.redirect('/wiki');
})



