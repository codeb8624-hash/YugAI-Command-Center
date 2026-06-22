import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.js";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
