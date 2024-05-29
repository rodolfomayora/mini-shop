class BaseError extends Error {
  datetime: string;
  constructor(message: string, options) {
    super(message, {
      cause: options?.cause,
    });
    this.name = 'HttpError';
    this.datetime = new Date().toJSON();
  }
}

export class HttpError extends BaseError {
  constructor(message, options) {
    super(message, {
      cause: options?.cause,
    });
    this.name = 'HttpError';
  }
}