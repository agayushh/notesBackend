export interface SanitizedReqType {
  body: unknown;
  headers: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;
}