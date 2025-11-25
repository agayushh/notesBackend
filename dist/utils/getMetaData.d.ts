import type { Request } from "express";
import type { RequestMetadata } from "../types/RequestMetaData.js";
export declare const extractRequestMetadata: (req: Request) => RequestMetadata;
export declare const parseUserAgent: (userAgent: string) => {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    os: string;
    browser: string;
};
//# sourceMappingURL=getMetaData.d.ts.map