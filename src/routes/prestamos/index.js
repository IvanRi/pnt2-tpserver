import { Router } from "express";
import { Prestamo } from "../../models/Prestamo.js";
import { Cuenta, MovimientoCuenta } from "../../models/Cuenta.js";
import { getCurrentTimeFormated } from "../../utils/timeHandlers.js";

const router = Router();

//listar todos los prestamos por dni
router.get("/:dni", (request, response) => {
  const { dni } = request.params;
  console.log("DNI: ", dni);
  Prestamo.find({ dni })
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((err) =>
      response.status(404).json({ error: "Error recurso no encontrado" })
    );
});

//crear un prestamos nuevo
router.post("/", async (request, response) => {
  const {
    dni,
    montoOtorgado,
    totalAPagar,
    cantCuotas,
    interes,
    cuotasPendientes,
    valorCuota,
  } = request.body;

  const session = await Cuenta.startSession();
  session.startTransaction();

  try {
    const prestamo = new Prestamo({
      dni,
      montoOtorgado,
      totalAPagar,
      cantCuotas,
      interes,
      cuotasPendientes,
      valorCuota,
      fecha: getCurrentTimeFormated(),
    });

    const nroCuentaDestino = `${dni}-001`;

    const nuevoMovEntrada = new MovimientoCuenta({
      destino: nroCuentaDestino,
      origen: 46537354,
      monto: montoOtorgado,
      descripcion: "Prestamo",
      tipoMovimiento: "entrada",
      fecha: getCurrentTimeFormated(),
    });

    const opts = { session };
    console.log("nuevo mov: ", nuevoMovEntrada);

    const res = await Cuenta.findOneAndUpdate(
      { nroCuenta: nroCuentaDestino },
      {
        $inc: { saldo: montoOtorgado },
        $push: { movimientos: nuevoMovEntrada },
      },
      opts
    );
    console.log("HOLA");

    const prestamoRes = await prestamo.save();
    console.log("PRESTAMORES: ", prestamoRes);
    await session.commitTransaction();
    session.endSession();
    return response.json(prestamoRes);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return response
      .status(404)
      .json({ msg: "Error en la creacion del prestamo", Error: err });
  }
});

export default router;
