import express from "express";
import morgan from "morgan";

import routes from "./routes";

class App {
  server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    this.server.use(morgan("dev"));
  }

  routes() {
    this.server.use("/api/v1", routes);
  }
}

export default new App().server;
