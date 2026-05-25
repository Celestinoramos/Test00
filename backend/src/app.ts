import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { authRouter } from "./modules/auth/auth.routes";
import { certificatesRouter } from "./modules/certificates/certificates.routes";
import { historyRouter } from "./modules/history/history.routes";
import { issuanceRouter } from "./modules/issuance/issuance.routes";
import { settingsRouter } from "./modules/settings/settings.routes";
import { studentsRouter } from "./modules/students/students.routes";
import { validationRouter } from "./modules/validation/validation.routes";
import { errorHandler } from "./shared/errors/error-handler";
import { authRequired } from "./shared/middleware/auth";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use(authRequired);
app.use("/students", studentsRouter);
app.use("/certificates", certificatesRouter);
app.use("/issuance", issuanceRouter);
app.use("/validation", validationRouter);
app.use("/history", historyRouter);
app.use("/settings", settingsRouter);

app.use(errorHandler);

export { app };
