import type { Request } from "express";
import type { RequestMetadata } from "../types/RequestMetaData.js";

export const extractRequestMetadata = (req: Request): RequestMetadata => {
  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
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
  const host = req.headers["host"]?.toString() || "";
  const path = req.path;
  const url = host + path;

  const customHeaders: Record<string, string> = {};
  Object.keys(req.headers).forEach((key) => {
    if (
      key.startsWith("x-") &&
      !["x-forwarded-for", "x-real-ip"].includes(key)
    ) {
      customHeaders[key] = req.headers[key]?.toString() || "";
    }
  });
  return {
    ip,
    userAgent,
    origin,
    host,
    url,
    referer,
    acceptLanguage,
    contentType,
    customHeaders,
  };
};

export const parseUserAgent = (userAgent: string) => {
  const isMobile = /mobile/i.test(userAgent);
  const isTablet = /tablet|ipad/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  const browser = /edg/i.test(userAgent)
    ? "Edge"
    : /chrome/i.test(userAgent)
      ? "Chrome"
      : /firefox/i.test(userAgent)
        ? "Firefox"
        : /safari/i.test(userAgent)
          ? "Safari"
          : "Unknown";

  const os = /windows/i.test(userAgent)
    ? "Windows"
    : /android/i.test(userAgent)
      ? "Android"
      : /iphone|ipad|ipod/i.test(userAgent)
        ? "iOS"
        : /mac/i.test(userAgent)
          ? "MacOS"
          : /linux/i.test(userAgent)
            ? "Linux"
            : "Unknown";

  return { isMobile, isTablet, isDesktop, os, browser };
};
