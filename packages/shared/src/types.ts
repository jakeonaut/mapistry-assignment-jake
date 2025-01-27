export type DateLike = Date | string;

export type LogEntryResponse = {
  id: string;
  logId: string;
  logDate: DateLike;
  logValue: number;
};

export type CreateLogEntryRequest = {
  logDate: DateLike;
  logValue: number;
};

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  TEMPORARY_REDIRECT = 302,
  INVALID_REQUEST = 400,
  INVALID_CREDENTIALS = 401,
  UNAUTHORIZED_REQUEST = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  MISSING_QUERY_PARAM = 422,
  MISSING_DATA = 422,
  INVALID_DATA = 422,
  SERVER_ERROR = 500,
  UNIMPLEMENTED_ERROR = 501,
}
