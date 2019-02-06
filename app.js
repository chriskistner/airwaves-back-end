const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 8080

app.use(cors());
app.disable('x-powered-by');
app.use(bodyParser.json());
require('dotenv').load();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const user = require('./src/routes/users');
const auth = require('./src/routes/auth');

app.use('/auth', auth);
app.use('/users', user);

app.use(function(req, res, next) {
  next({status: 404, error: 'Route Not Found'})
})

app.use((err, _req, res, _next)=> {
  console.error("ERROR: ", err)
  const status = err.status || 500
  const error = err.error || 'Internal Server Error'
  const stack = err.stack
  res.status(status).json({ error, status, stack })
})

if (process.env.NODE_ENV !== 'development') {
  const listener = () => console.log(`listening on ${port}`)
  let server = app.listen(port, listener)
}