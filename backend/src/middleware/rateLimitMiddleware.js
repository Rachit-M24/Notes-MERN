import rateLimitConfig from "../config/upstash.js";

const rateLimitMiddleware = async (req, res, next) => {
  const { success } = await rateLimitConfig.limit(req.ip);
  try {
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.error("Error occurred while checking rate limit:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export default rateLimitMiddleware;