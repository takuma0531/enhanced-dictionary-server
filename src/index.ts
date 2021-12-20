import express from "express";
import cors from "cors";
import { Server } from "./Server";
import { ServerParts } from "./typings/common/server";
import { ServerConstants } from "./config/constants";
import { userRouter, wordRouter } from "./routes";

const serverParts: ServerParts = {
  host: ServerConstants.SERVER_HOST,
  port: ServerConstants.SERVER_PORT,
  middlewares: [express.json(), cors()],
  routes: [
    {
      baseRoute: "/api/v1/users",
      router: userRouter,
    },
    {
      baseRoute: "/api/v1/words",
      router: wordRouter,
    },
  ],
};

const server = new Server(serverParts);
server.init();
