import express, { Express } from "express";
import { ServerParts, Route } from "./typings/common/server";

class Server {
  private readonly _app: Express;
  private readonly _port: string;
  private readonly _host: string;

  constructor(serverParts: ServerParts) {
    this._app = express();
    this._host = serverParts.host;
    this._port = serverParts.port;
    this.setMiddlewares(serverParts.middlewares);
    this.setRoutes(serverParts.routes);
  }

  public init() {
    this._app.listen(this._port, () =>
      console.log(`Server is running on ${this._host}:${this._port}`)
    );
  }

  private setMiddlewares(middlewares: Array<any>) {
    middlewares.forEach((middleware) => {
      this._app.use(middleware);
    });
  }

  private setRoutes(routes: Array<any>) {
    routes.forEach((route: Route) => {
      this._app.use(route.baseRoute, route.router);
    });
  }
}

export { Server };
