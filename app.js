const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const PORT = 1337;
app.ListeningStateChangedEvent(PORT, () => {
  console.log(`App listening in port ${PORT}`);
})
