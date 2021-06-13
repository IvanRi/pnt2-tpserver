import { Router } from "express";
import { Servicio } from "../../models/Servicios.js";
import { Cuenta, MovimientoCuenta } from "../../models/Cuenta.js";
import {
  getCurrentTimeFormated,
  formatTime,
} from "../../utils/timeHandlers.js";
import moment from "moment";

const router = Router();

//cargar un servicio
router.post("/", async (request, response) => {
  const { dni, idServicio, monto, name } = request.body;

  try {
    const newService = new Servicio({
      name,
      idServicio,
      monto,
      pagada: false,
      vencimiento: formatTime(moment().add(10, "days")),
      fechaPago: null,
      dniTitular: dni,
    });
    const res = await newService.save();
    console.log("RES: ", res);
    return response.json({ msg: "Creacion exitosa", result: res });
  } catch (err) {
    console.log("ERROR: ", err);
    return response.status(400).json({ Error: "Error cargando servicio!" });
  }
});

//listar todos los pagos por dni
router.get("/:dni", (request, response) => {
  const { dni } = request.params;
  console.log("DNI: ", dni);
  Servicio.find({ dniTitular: dni })
    .then((res) => {
      response.status(200).json(res);
    })
    .catch((err) =>
      response.status(404).json({ error: "Error recurso no encontrado" })
    );
});

//pagar servicio
router.post("/pagar", async (request, response) => {
  const { dni, idServicio } = request.body;

  const session = await Cuenta.startSession();
  session.startTransaction();

  try {
    const nroCuentaOrigen = `${dni}-001`;

    const opts = { session };
    const updatedService = await Servicio.findOneAndUpdate(
      { dniTitular: dni, idServicio },
      {
        pagada: true,
        fechaPago: getCurrentTimeFormated(),
      },
      opts
    );

    const nuevoMovSalida = new MovimientoCuenta({
      destino: "12345678-001",
      origen: dni,
      monto: updatedService.monto,
      descripcion: "Pago",
      tipoMovimiento: "salida",
      fecha: getCurrentTimeFormated(),
    });

    await Cuenta.findOneAndUpdate(
      { idUsuario: dni, nroCuenta: nroCuentaOrigen },
      {
        $inc: { saldo: -updatedService.monto },
        $push: { movimientos: nuevoMovSalida },
      },
      opts
    );

    response.json({ updatedService });
    await session.commitTransaction();
    return session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return response
      .status(404)
      .json({ msg: "Error en el pago del servicio", Error: err });
  }
});

export default router;
