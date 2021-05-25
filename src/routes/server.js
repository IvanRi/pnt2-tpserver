import express from "express";
import userRouter from "./users/index.js";
import countRouter from "./Cuentas/index.js";

async function createServer(dbConnectionFn) {
  const app = express();

  app.use(express.json());

  const port = process.env.PORT || 3002;

  await app.listen(port, () => console.log("Server listen in port: ", port));
  await dbConnectionFn();

  app.use("/users", userRouter);
  app.use("/accounts", countRouter);
}

export default { createServer };
