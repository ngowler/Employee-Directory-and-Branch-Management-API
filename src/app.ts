import express, { Express } from "express";
import setupSwagger from "../config/swagger";
// Importing morgan
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes"
import branchRoutes from "./api/v1/routes/branchRoutes"

const app: Express = express();

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

app.use("/api/v1/employee", employeeRoutes)
app.use("/api/v1/branch", branchRoutes)

export default app;