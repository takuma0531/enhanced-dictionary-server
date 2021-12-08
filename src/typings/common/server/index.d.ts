import { Router } from "express";

interface ServerParts {
  host: string;
  port: string;
  middlewares: Array<any>;
  routes: Array<Route>;
}

interface Route {
  baseRoute: string;
  router: Router;
}

export { ServerParts, Route };
