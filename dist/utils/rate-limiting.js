const rateLimiting = new Map();
const MAX_LIMITS = 5;
const WINDOW_FRAME = 60 * 1000;
export const limiter = (req, res, next) => {
    const key = req.ip || "";
    const now = Date.now();
    const userIp = rateLimiting.get("key") || [];
    const validTimeStamps = userIp.filter((time) => {
        now - time < WINDOW_FRAME;
    });
    if (validTimeStamps.length >= MAX_LIMITS) {
        return res.status(429).json({ message: "Too many request sent" });
    }
    validTimeStamps.push(now);
    rateLimiting.set(key, validTimeStamps);
    next();
};
//# sourceMappingURL=rate-limiting.js.map