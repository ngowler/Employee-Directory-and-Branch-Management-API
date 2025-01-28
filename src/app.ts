import express, { Express } from "express";
import setupSwagger from "../config/swagger";
// Importing morgan
import morgan from "morgan";

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

export default app;