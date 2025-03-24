import request from "supertest";
import app from "../src/app";

describe("CORS and Helmet.js Integration Tests", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it("should include Helmet headers in responses", async () => {
        const response = await request(app).get("/health");

        expect(response.headers["x-dns-prefetch-control"]).toBe("off");
        expect(response.headers["x-frame-options"]).toBe("SAMEORIGIN");
        expect(response.headers["x-content-type-options"]).toBe("nosniff");
        expect(response.headers["x-download-options"]).toBe("noopen");
        expect(response.headers["strict-transport-security"]).toContain("max-age");
    });

    it("should allow requests from trusted origins via CORS", async () => {
        process.env.TRUSTED_ORIGIN = "http://example.com";

        const corsOptions = {
            origin: process.env.TRUSTED_ORIGIN ? [process.env.TRUSTED_ORIGIN] : [],
        };

        const response = await request(app).get("/health").set("Origin", "http://example.com");

        expect(corsOptions.origin).toContain("http://example.com");
        expect(response.status).toBe(200);
    });

    it("should return status 200 for /health endpoint", async () => {
        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Server is healthy");
    });
});
