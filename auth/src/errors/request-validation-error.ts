import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Error validating parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const parsedErrors = this.errors.map(({ msg, param }) => ({
      message: msg,
      field: param,
    }));

    return parsedErrors;
  }
}
