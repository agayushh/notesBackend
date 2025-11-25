import { extractRequestMetadata } from "../utils/getMetaData.js";
export const requestLogger = (req, res, next) => {
    const metaData = extractRequestMetadata(req);
    console.log({
        timeStamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        ...metaData,
    });
    return next();
};
//# sourceMappingURL=logSecurity.js.map