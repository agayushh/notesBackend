import type { NextFunction, Request, Response } from "express";

const getDuration = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on("finish", () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request took ${duration}ms`);
    });

    next();

    
}