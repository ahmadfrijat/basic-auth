'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFoundHndler = require('../src/middleware/404.js');
const errorHandler = require('../src/middleware/500.js');
const router = require('../src/auth/router.js');
const app = express();


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/bad', (res, req) => {
	throw new Error();
});
app.use(router);
app.use('*', notFoundHndler);
app.use(errorHandler);


module.exports = {
    server: app,
    start: (port) => {
      const PORT = port || 8080;
      app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
  };