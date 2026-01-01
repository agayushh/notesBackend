import type { NextFunction, Request, Response } from "express";
export declare const limiter: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=rate-limiting.d.ts.map