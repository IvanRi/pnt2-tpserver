import express from "express";
import { isAuth as auth } from "./middlewares/auth.js";

import { createPrivateRoute } from "./task/index.js";

function createServer() {
  const app = express();

  app.use(express.json());

  const port = 3000;

  app.use("/todo", auth, createPrivateRoute());

  return new Promise((resolve, reject) => {
    const server = app
      .listen(port)
      .once("error", () => {
        reject(new Error("Error de conexion servidor."));
      })
      .once("listening", () => {
        server.port = server.address().port;
        resolve(server);
      });
  });
}

export default { createServer };
