import express, { Application, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import path from "node:path";
import { ValidateError } from "tsoa";

const app: Application = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import(path.join(__dirname, "../public/swagger.json")))
    );
});

RegisterRoutes(app);

app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    next();
});

export default app;