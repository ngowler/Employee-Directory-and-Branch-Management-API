import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

import setupSwagger from "../config/swagger";
import employeeRoutes from "./api/v1/routes/employeeRoutes"
import branchRoutes from "./api/v1/routes/branchRoutes"
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();
app.use(express.json());

app.use(helmet());

const corsOptions: CorsOptions = {
    origin: process.env.TRUSTED_ORIGIN ? [process.env.TRUSTED_ORIGIN] : [],
};  
app.use(cors(corsOptions));

setupSwagger(app);

app.use(morgan("combined"));

/**
 * @route GET /health
 * @description Check if the server is healthy.
 *
 * @openapi
 * /health:
 *   get:
 *     summary: Check if the server is healthy
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Server is healthy
 */
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/branch", branchRoutes);

app.use(errorHandler);

export default app;
