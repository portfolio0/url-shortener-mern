export const errorhandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.log(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export class AppError extends Error {
  statusCode;
  isoperational;

  constructor(message, statusCode = 500, isoperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isoperational = isoperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class conflictError extends AppError {
  constructor(message = "conflict occured") {
    super(message, 409);
  }
}

export class unauthorizedError extends AppError {
  constructor(message = "unauthorized") {
    super(message, 401);
  }
}
