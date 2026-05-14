
function errorMiddleware(err, req, res, next) {
  console.error("ERROR MIDDLEWARE:", err);
  res.status(500).json({ error: "Internal Server Error" });
  next();
}

export default errorMiddleware;