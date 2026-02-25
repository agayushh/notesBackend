import type { NextFunction, Request, Response } from "express";
import type { SanitizedReqType } from "../types/SanitizedReqType.js";

const SENSITIVE_FIELDS = [
  "password",
  "secret",
  "authorization",
  "ssn",
  "api_key",
  "apikey",
  "token",
  "jwt",
  "cookie",
  "set-cookie",
  "x-api-key",
  "credit_card",
  "creditcard",
  "refresh_token",
  "access_token",
  "otp",
];

const REDACTED = "[REDACTED]";
const redactObject = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(obj)) {
    if (SENSITIVE_FIELDS.includes(key.toLowerCase())) {
      result[key] = REDACTED;
    } else if (
      obj[key] !== null &&
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key])
    ) {
      result[key] = redactObject(obj[key] as Record<string, unknown>);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

export const sanitizeRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sanitized: SanitizedReqType = {
    body:
      req.body && typeof req.body === "object"
        ? redactObject(req.body)
        : req.body,
    headers: redactObject(req.headers as Record<string, unknown>),
    query: redactObject(req.query as Record<string, unknown>),
    params: redactObject(req.params as Record<string, unknown>),
  };

  res.locals.sanitized = sanitized;

  return next();
};
