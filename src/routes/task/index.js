import { Router } from "express";

function createPrivateRoute() {
  const router = Router();

  router.get("/", (req, res) => {
    try {
      res.send({ message: "Acceso autorizado a '/' ... :D" });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Error al acceder al recurso: ", err });
    }
  });

  return router;
}

export { createPrivateRoute };
