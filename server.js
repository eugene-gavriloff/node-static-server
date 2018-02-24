import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Configurate app
const { parsed: env } = dotenv.config();
const app = express();

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(env.PORT, env.HOST, function () {
  console.log(`Server listening on http://${env.HOST}:${env.PORT}`);
});
