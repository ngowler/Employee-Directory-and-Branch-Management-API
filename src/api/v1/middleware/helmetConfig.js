import helmet from "helmet";
import { HelmetConfigurationError } from "../errors/errors";

const helmetConfig = (app) => {
    try {
        app.use(helmet());
    } catch (error) {
        throw new HelmetConfigurationError(
            "Error initializing Helmet middleware",
            "HELMET_INIT_ERROR",
            500
        );
    }

    try {
        app.use(
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    styleSrc: ["'self'"],
                    imgSrc: ["'self'"],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    upgradeInsecureRequests: [],
                },
            })
        );
    } catch (error) {
        throw new HelmetConfigurationError(
            "Error configuring Content Security Policy",
            "CSP_CONFIG_ERROR",
            500
        );
    }

    try {
        app.disable("x-powered-by");
    } catch (error) {
        throw new HelmetConfigurationError(
            'Error disabling "x-powered-by" header',
            "DISABLE_HEADER_ERROR",
            500
        );
    }

    try {
        app.use((req, res, next) => {
            try {
                res.setHeader("X-XSS-Protection", "1; mode=block");
                next();
            } catch (innerError) {
                throw new HelmetConfigurationError(
                    "Error setting X-XSS-Protection header",
                    "XSS_PROTECTION_ERROR",
                    500
                );
            }
        });
    } catch (error) {
        throw new HelmetConfigurationError(
            "Error adding XSS Protection middleware",
            "XSS_MIDDLEWARE_ERROR",
            500
        );
    }

    try {
        app.use(
            helmet.referrerPolicy({
                policy: "same-origin",
            })
        );
    } catch (error) {
        throw new HelmetConfigurationError(
            "Error setting Referrer Policy",
            "REFERRER_POLICY_ERROR",
            500
        );
    }
};

export default helmetConfig;
