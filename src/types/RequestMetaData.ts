export interface RequestMetadata {
  ip: string;
  userAgent: string;
  origin?: string;
  host?: string;
  url?:string;
  referer?: string;
  acceptLanguage?: string;
  contentType?: string;
  authorization?: string;
  customHeaders: Record<string, string>;
}
