// Configuration to return "JSON error" instead of returning "HTML error" so that we can get "error message" in frontend.
// After all routes and other middleware:

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    errors: err.errors?.length ? err.errors : undefined,
  });
};

export { errorHandler };

/*

// explanation of the code Above:-
--------------------------------
// After all routes and other middleware:
app.use((err, req, res, next) => {
  // If headers were sent already, delegate to default handler
  if (res.headersSent) return next(err);

  // Determine status (use your error's statusCode or default to 500)
  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message,
    // Optionally include more info like stack in non-production
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    errors: err.errors || undefined,
  });
});

*/
