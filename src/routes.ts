import type { Handler, NextFunction, Request, Response } from "express";
import { Router } from "express";
import { UserCreateController } from "./controllers/UserCreateController";
import { UserLoginController } from "./controllers/UserLoginController";
import authJWT from "./middlewares/verifyAuthJwt";

const resolver = (handler: Handler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handler(req, res, next)).catch((e) => next(e));
  };
};

const routes = Router();

const user_create = new UserCreateController();
const user_login = new UserLoginController();

routes.post("/create_user", resolver(user_create.handle));
routes.post("/login_user", resolver(user_login.handle));
routes.get("/test", authJWT, (req, res) => {
  res.json({ ok: "ok" });
});

routes.get("/", (req, res) => {
  res.end("micael");
});

export default routes;
