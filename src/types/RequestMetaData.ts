export interface RequestMetadata {
  ip: string;
  userAgent: string;
  origin?: string;
  host?: string;
  url?: string;
  referer?: string;
  acceptLanguage?: string;
  contentType?: string;
  customHeaders: Record<string, string>;
}
