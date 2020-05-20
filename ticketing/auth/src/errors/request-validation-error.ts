import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(private _errors: ValidationError[]) {
    super("Invalid request params");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this._errors.map(({ msg: message, param: field }) => ({
      field,
      message,
    }));
  }
}
