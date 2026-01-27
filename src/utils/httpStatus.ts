import type { Response } from "express"

export const httpStatus = (res: Response) => {
    if(res.status.toString() === "200"){
        return "success";
    }
    if(res.status.toString() === "201"){
        return "created";
    }
    if(res.status.toString() === "202"){
        return "accepted";
    }
    if(res.status.toString() === "204"){
        return "no content";
    }
    if(res.status.toString() === "400"){
        return "bad request";
    }
    if(res.status.toString() === "401"){
        return "unauthorized";
    }
    if(res.status.toString() === "403"){
        return "forbidden";
    }
    if(res.status.toString() === "404"){
        return "not found";
    }
    if(res.status.toString() === "409"){
        return "conflict";
    }
    if(res.status.toString() === "500"){
        return "internal server error";
    }
    if(res.status.toString() === "501"){
        return "not implemented";
    }
    if(res.status.toString() === "502"){
        return "bad gateway";
    }
    if(res.status.toString() === "503"){
        return "service unavailable";
    }
    if(res.status.toString() === "504"){
        return "gateway timeout";
    }
    if(res.status.toString() === "505"){
        return "http version not supported";
    }
    if(res.status.toString() === "506"){
        return "variant also negotiates";
    }
    if(res.status.toString() === "507"){
        return "insufficient storage";
    }
    if(res.status.toString() === "508"){
        return "loop detected";
    }
    if(res.status.toString() === "510"){
        return "not extended";
    }
    if(res.status.toString() === "511"){
        return "network authentication required";
    }
    return "unknown";   
}