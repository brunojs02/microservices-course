import { CustomError } from "./custom-error";

export class NotAUthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not authorized");
    Object.setPrototypeOf(this, NotAUthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
