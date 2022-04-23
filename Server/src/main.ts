import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import * as dotenv from "dotenv";
import { dbConnect } from "./config/db";
import morgan from "morgan";
import helmet from "helmet";
import { userRoute, prodRoute } from "./router/index";
import ErrorHandler from "./middlewares/ErrorHandle";
import UserHandler from "./middlewares/UserHandler";

const app = express();
app.use(cors());
dotenv.config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const PORT = process.env.APP_PORT || 5000;

dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// app.use(ErrorHandler);

app.use("/user", UserHandler,userRoute);
app.use("/product", prodRoute);
