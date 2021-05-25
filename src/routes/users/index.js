import { Router } from "express";
import { Usuario } from "../../models/Usuario.js";

const router = Router();

router.post("/", async (request, response) => {
  try {
    const { nombre, dni } = request.body;
    const usuariosConDNI = await Usuario.findOne({
      dni,
    }).then((res) => res);
    if (usuariosConDNI) {
      return response
        .status(400)
        .json({ Error: "Ya existe un usuario con ese DNI" });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      dni,
    });

    return nuevoUsuario.save().then((savedUser) => response.json(savedUser));
  } catch (err) {
    return response
      .status(404)
      .json({ Error: "error en la creacion del usuario." });
  }
});

//get all Usuarios
router.get("/", (request, response) => {
  try {
    Usuario.find({})
      .then((res) => {
        response.status(200).json(res);
      })
      .catch((err) =>
        response.status(404).json({ error: "Error recurso no encontrado" })
      );
  } catch (err) {
    console.log("ERROR: ", err);
  }
});

//get Usuarios by range
router.get("/range", (request, response) => {
  const { desde, hasta } = request.query;
  Usuario.find({ age: { $gte: desde, $lte: hasta } })
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((err) =>
      response.status(404).json({ error: "Error recurso no encontrado" })
    );
});

//get Usuario by dni
router.get("/:dni", (request, response) => {
  const { dni } = request.params;
  Usuario.findOne({ dni })
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((err) =>
      response.status(404).json({ error: "Error recurso no encontrado" })
    );
});

//delete a Usuario by dni
router.delete("/:dni", (request, response) => {
  const { dni } = request.params;
  Usuario.deleteOne({ dni })
    .then((res) =>
      response.json({ msg: "Eliminacion exitosa!", count: res.deletedCount })
    )
    .catch((err) => {
      response.status(404).json({ error: "Error recurso no encontrado" });
    });
});

//update a Usuario by dni
router.put("/:dni", (request, response) => {
  const { dni } = request.params;
  Usuario.updateOne({ dni }, { ...request.body })
    .then((res) =>
      response.json({ msg: "Actualizacion exitosa!", count: res.n })
    )
    .catch((err) => {
      response.status(404).json({ error: "Error recurso no encontrado" });
    });
});

export default router;
