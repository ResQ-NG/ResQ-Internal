/** Thrown by the HTTP layer after normalizing Axios failures. */
export class ApiCustomError extends Error {
  readonly status: number;
  readonly data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiCustomError";
    this.status = status;
    this.data = data;
    Object.setPrototypeOf(this, ApiCustomError.prototype);
  }
}

export default ApiCustomError;
