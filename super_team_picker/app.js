const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

// const rootRouter = require("./routes/root");
const cohortsRouter = require("./routes/cohorts");

const knex = require("./db/client");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method
    return method;
  }
}))

app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.set('view engine', 'ejs');

// app.use(rootRouter);
app.use("/cohorts", cohortsRouter);

app.get('/', (req, res) => {
  res.render('welcome');
})

const PORT = 4545;
const ADDRESS = 'localhost';

app.listen(PORT, ADDRESS, () => {
  console.log(`Express Server started on ${ADDRESS}:${PORT}`);
});