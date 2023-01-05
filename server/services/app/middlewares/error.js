const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = 'Internal Server Error';

  console.log(err, 'error nih');

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    code = 400;
    msg = err.errors.map(el => {
      return el.message;
    });
  } else if (err.name === 'Empty Fields') {
    code = 400;
    msg = err.message;
  } else if (err.name === 'Empty Email') {
    code = 400;
    msg = 'Email is required';
  } else if (err.name === 'Empty Password') {
    code = 400;
    msg = 'Password is required';
  } else if (err.name === 'Unauthorized') {
    code = 401;
    msg = 'Invalid email/password';
  } else if (err.name === 'JsonWebTokenError') {
    code = 401;
    msg = 'Invalid token';
  } else if (err.name === 'Not Found') {
    code = 404;
    msg = 'Product not found';
  } else if (err.name === 'Category Not Found') {
    code = 404;
    msg = 'Category not found';
  } else if (err.name === 'Forbidden') {
    code = 403;
    msg = 'You are not authorized';
  }

  res.status(code).json({
    message: msg,
  });
};

module.exports = errorHandler;
