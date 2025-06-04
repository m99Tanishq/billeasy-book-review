import "dotenv/config";
import cors from "cors";
import express from "express";
import { SERVER_PORT } from "./config/constants";
import { errorHandler } from "./middlewares/error.middleware";
import { routes } from "./routes/index.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
//Error handler
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
