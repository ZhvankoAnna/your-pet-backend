import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

import usersRouter from "./routes/api/users.js";
import petsRouter from "./routes/api/pets.js";
import newsRouter from "./routes/api/news.js";
import noticesRouter from "./routes/api/notices.js";
import sponsorsRouter from "./routes/api/sponsors.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
app.use("/pets", petsRouter);
app.use("/news", newsRouter);
app.use("/notices", noticesRouter);
app.use("/sponsors", sponsorsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

export default app;
