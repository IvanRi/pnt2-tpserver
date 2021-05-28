import { Router } from "express";
import { Cuenta, MovimientoCuenta } from "../../models/Cuenta.js";
import { getCurrentTimeFormated } from "../../utils/timeHandlers.js";

const router = Router();

//traer todas las cuentas por dni
router.get("/:dni", (request, response) => {
  const { dni } = request.params;
  console.log("DNI: ", dni);
  Cuenta.find({ idUsuario: dni })
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((err) =>
      response.status(404).json({ error: "Error recurso no encontrado" })
    );
});

//agregarle una cuenta a un usuario
router.post("/", async (request, response) => {
  try {
    const { dni, tipo, moneda } = request.body;
    const usuariosConDNI = await Cuenta.findOne({
      idUsuario: dni,
      moneda,
    });

    if (usuariosConDNI) {
      return response
        .status(400)
        .json({ Error: `este usuario ya tiene una cuenta de: ${tipo}` });
    }

    const nuevaCuenta = new Cuenta({
      idUsuario: dni,
      tipo,
      moneda,
      nroCuenta: `${dni}-00${moneda === "dolares" ? "2" : "1"}`,
      saldo: 0,
      movimientos: [],
    });

    return nuevaCuenta.save().then((savedCount) => response.json(savedCount));
  } catch (err) {
    return response
      .status(404)
      .json({ Error: "error en la vinculacion de la cuenta." });
  }
});

//hacer una transferencia
router.put("/transfer", async (request, response) => {
  const { dni, nroCuenta, monto, descripcion, nroCuentaDestino } = request.body;

  const session = await Cuenta.startSession();
  session.startTransaction();
  try {
    const estadoCuenta = await Cuenta.findOne({ nroCuenta });
    if (estadoCuenta.saldo < monto) {
      return response.json({
        msg: "Fondos insuficientes :(",
      });
    }

    const nuevoMovSalida = new MovimientoCuenta({
      destino: nroCuentaDestino,
      origen: dni,
      monto,
      descripcion,
      tipoMovimiento: "salida",
      fecha: getCurrentTimeFormated(),
    });
    const nuevoMovEntrada = new MovimientoCuenta({
      destino: nroCuentaDestino,
      origen: dni,
      monto,
      descripcion,
      tipoMovimiento: "entrada",
      fecha: getCurrentTimeFormated(),
    });
    const opts = { session };
    const res = await Cuenta.findOneAndUpdate(
      { nroCuenta },
      { $inc: { saldo: -monto }, $push: { movimientos: nuevoMovSalida } },
      opts
    );

    const resDestino = await Cuenta.findOneAndUpdate(
      { nroCuenta: nroCuentaDestino },
      { $inc: { saldo: monto }, $push: { movimientos: nuevoMovEntrada } },
      opts
    );

    await session.commitTransaction();
    session.endSession();
    return response.json({
      msg: "Actualizacion exitosa!",
      count: res.n + resDestino.n,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log("ERROR: ", error);
    return response.status(404).json({ error: "Error en la transferencia." });
  }
});

export default router;
