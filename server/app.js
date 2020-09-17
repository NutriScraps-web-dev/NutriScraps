
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

const recipesRouter = require('./routes/recipe');
const ingredientsRouter = require('./routes/ingredient');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const roleRouter = require('./routes/role');
const adminRouter = require('./routes/admin');

const commentRouter = require('./routes/comment');
const ratingRouter = require('./routes/rating');

// Variables
var mongoURI =
  process.env.MONGODB_URI ||
  'mongodb+srv://idreesGu:mongodb12345@cluster0.drfwp.mongodb.net/nutriScraps?retryWrites=true&w=majority';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
      console.error(err.stack);
      process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
  }
);

// Create Express app
const app = express();
// Parse requests of content-type 'application/json'
app.use(bodyParser.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Import routes
app.get('/api', function (req, res) {
  res.json({ message: 'Welcome to your DIT341 backend ExpressJS project!' });
});

app.use('/users', authRouter);
app.use('/user', userRouter);
app.use('/admins', roleRouter);
app.use('/admins', adminRouter);

app.use('/comment', commentRouter);
app.user('/rating', ratingRouter);

app.use(recipesRouter);
app.use(ingredientsRouter);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
const root = path.normalize(__dirname + '/..');
const client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
// app.use((err, req, res, next) => {
//   console.log(err);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   res.status(status).json({ message: message });
// });

// eslint-disable-next-line no-unused-consts
app.use((err, req, res, next) => {
    console.error(err.stack);
    const err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
