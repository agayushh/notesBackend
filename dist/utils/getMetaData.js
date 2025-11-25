import { boolean, startsWith } from "zod";
export const extractRequestMetadata = (req) => {
    const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
        req.headers["x-real-ip"]?.toString() ||
        req.headers["cf-connecting-ip"]?.toString() ||
        req.socket.remoteAddress ||
        req.ip ||
        "Unknown";
    //User-Agent
    const userAgent = req.headers["user-agent"] || "Unknown";
    const origin = req.headers["origin"]?.toString() || "";
    const referer = req.headers["referer"]?.toString() || "";
    const acceptLanguage = req.headers["accept-language"]?.toString() || "";
    const contentType = req.headers["content-type"]?.toString() || "";
    const authorization = req.headers["authorization"]?.toString() || "";
    const customHeaders = {};
    Object.keys(req.headers).forEach((key) => {
        if (key.startsWith("x-") &&
            !["x-forwarded-for", "x-real-ip"].includes(key)) {
            customHeaders[key] = req.headers[key]?.toString() || "";
        }
    });
    return {
        ip,
        userAgent,
        origin,
        referer,
        acceptLanguage,
        contentType,
        authorization,
        customHeaders,
    };
};
export const parseUserAgent = (userAgent) => {
    const isMobile = /mobile/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    const browser = /chrome/i.test(userAgent)
        ? "Chrome"
        : /firefox/i.test(userAgent)
            ? "Firefox"
            : /safari/i.test(userAgent)
                ? "Safari"
                : /edge/i.test(userAgent)
                    ? "Edge"
                    : "Unknown";
    const os = /windows/i.test(userAgent)
        ? "Windows"
        : /linux/i.test(userAgent)
            ? "Linux"
            : /ios/i.test(userAgent)
                ? "iOS"
                : /mac/i.test(userAgent)
                    ? "MacOS"
                    : /android/i.test(userAgent)
                        ? "Android"
                        : "Unknown";
    return { isMobile, isTablet, isDesktop, os, browser };
};
//# sourceMappingURL=getMetaData.js.map