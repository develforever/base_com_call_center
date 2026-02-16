import express, { Application, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import path from "node:path";

const app: Application = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import(path.join(__dirname, "../public/swagger.json")))
    );
});

RegisterRoutes(app);

export default app;