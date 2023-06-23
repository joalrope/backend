import express, { Express } from "express";
import cors from "cors";
import { dbConnection } from "./database/config";
import swaggerUI from "swagger-ui-express";
//import { swaggerStart } from "./docs/swagger-start";
import { options } from "./docs/index";
import fileUpload from "express-fileupload";
import { apiRoutes } from "./routes";

export class Server {
  app: Express;
  port: string | undefined;
  routes: any;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Database connection
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Application routes
    this.routes = apiRoutes(this.app);

    // Redirection to SPA
    this.app.get("*", (_, res) => {
      res.sendFile("index.html", { root: __dirname });
    });
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(
      cors({
        origin: ["http://localhost:3000", "https://qrmenupr.onrender.com"],
      })
    );

    // Reading and parsing the body
    this.app.use(express.json());

    // Swagger integration
    this.app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(options));

    // Public Directory
    this.app.use(express.static("public"));

    // File upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
      //swaggerStart();
    });
  }
}
