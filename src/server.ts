import cors from "cors";
import express from "express";
import { handling_error } from "./middlewares/handling_async_error";
import routes from "./routes";

const host = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handling_error);
app.listen(host, () => {
  console.log("👦 Users_api is running");
});
