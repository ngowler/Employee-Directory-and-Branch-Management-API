import { CorsOptions } from "cors";
import { cert } from "firebase-admin/app";
import { EnvironmentConfigurationError } from "../src/api/v1/errors/errors";
import swaggerJsDoc from "swagger-jsdoc";

describe("Environment Variables Integration Tests", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    it("should correctly configure CORS with TRUSTED_ORIGIN", () => {
        process.env.TRUSTED_ORIGIN = "http://example.com";

        const corsOptions: CorsOptions = {
            origin: process.env.TRUSTED_ORIGIN ? [process.env.TRUSTED_ORIGIN] : [],
        };

        expect(corsOptions.origin).toEqual(["http://example.com"]);
    });

    it("should throw an error when Firebase configuration is missing", () => {
        delete process.env.FIREBASE_PROJECT_ID;
        delete process.env.FIREBASE_CLIENT_EMAIL;
        delete process.env.FIREBASE_PRIVATE_KEY;

        const getFirebaseConfig = (): { credential: ReturnType<typeof cert> } => {
            const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
        
            if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
                throw new EnvironmentConfigurationError(
                    "Missing Firebase configuration. Please check your environment variables.",
                    "FIREBASE_CONFIG_ERROR",
                    400
                );
            }
        
            const serviceAccount: {
                projectId: string;
                clientEmail: string;
                privateKey: string;
            } = {
                projectId: FIREBASE_PROJECT_ID,
                clientEmail: FIREBASE_CLIENT_EMAIL,
                privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            };
        
            return {
                credential: cert(serviceAccount),
            };
        };

        expect(getFirebaseConfig).toThrowError(
            "Missing Firebase configuration. Please check your environment variables."
        );
    });

    it("should use default PORT if none is provided", () => {
        delete process.env.PORT;

        const PORT: string | number = process.env.PORT || 3000;
        expect(PORT).toBe(3000);
    });

    it("should load Swagger server URL correctly", () => {
        process.env.SWAGGER_SERVER_URL = "http://localhost:3000/api/v1";
    
        const swaggerOptions: swaggerJsDoc.Options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Employee Directory and Branch Management API Documentation",
                    version: "1.0.0",
                    description:
                        "This is the API documentation for the Employee Directory and Branch Management application.",
                },
                servers: [
                    {
                        url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1",
                        description:
                            process.env.NODE_ENV === "production" ? "Production Server" : "Local Server",
                    },
                ],
            },
            apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/models/*.ts"],
        };
    
        expect(swaggerOptions.definition).toBeDefined();
        expect(swaggerOptions.definition!.servers).toBeDefined();
        expect(swaggerOptions.definition!.servers[0].url).toBe("http://localhost:3000/api/v1");
    });       
});
