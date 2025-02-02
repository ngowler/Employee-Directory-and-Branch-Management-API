import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
        },
    },
    apis: ["./src/app.ts",
    "./src/api/v1/routes/*.ts",
    "./src/api/v1/controllers/*.ts",
    "./src/api/v1/services/*.ts",]
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerDocs: any = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app: Express): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;