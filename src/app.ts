import express, { Express } from "express";
import setupSwagger from "../config/swagger";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes"
import branchRoutes from "./api/v1/routes/branchRoutes"
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();
app.use(express.json());

setupSwagger(app);
// Use morgan for HTTP request logging
app.use(morgan("combined"));

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check if the server is healthy
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/branch", branchRoutes);

app.use(errorHandler);

export default app;
