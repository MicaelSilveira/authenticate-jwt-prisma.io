export class AplicationServerError extends Error {
  name: string;
  statusCode: number;
  constructor(status: number, msg: string) {
    super(msg);
    this.name = "AplicationServerError";
    this.statusCode = status;
  }
}
