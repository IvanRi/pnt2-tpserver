import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const usuarioSchema = new Schema({
  nombre: String,
  dni: Number,
});

usuarioSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

export const Usuario = model("Usuario", usuarioSchema);

/* {
nombre: String,
dni: Number,
cuentas: [
  {
    tipo: "caja_ahorro",
    moneda: "pesos",
    nroCuenta: `${dni}-001`,
    saldo: 10000,
    movimientos: [
      {
        tipoMovimiento: "entrada",
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 1000,
      },
      {
        tipoMovimiento: "entrada",
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 2000,
      },
      {
        tipoMovimiento: "salida",
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 1000,
      },
      {
        tipoMovimiento: "salida",
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 4000,
      },
    ],
  },
  {
    tipo: "caja_ahorro",
    moneda: "dolares",
    nroCuenta: `${dni}-101`,
    saldo: 400,
    movimientos: [
      {
        tipoMovimiento: "entrada",
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 100,
      },
      {
        tipoMovimiento: "entrada",
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 200,
      },
      {
        tipoMovimiento: "salida",
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 100,
      },
      {
        tipoMovimiento: "salida",
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 400,
      },
    ],
  },
],
tarjetas: [
  {
    tipo: "visa",
    nroTarjeta: `4056${dni}0035`,
    fechaVencimiento: "13-04-2020",
    fechaCierre: "13-04-2020",
    saldo: 10000,
    movimientos: [
      {
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 1000,
      },
      {
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 2000,
      },
      {
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 1000,
      },
      {
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 4000,
      },
    ],
  },
  {
    tipo: "mastercard",
    nroTarjeta: `5940${dni}0035`,
    fechaVencimiento: "13-04-2020",
    fechaCierre: "13-04-2020",
    saldo: 4000,
    movimientos: [
      {
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 100,
      },
      {
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 200,
      },
      {
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 100,
      },
      {
        descripcion: "una descripcion",
        fecha: "13-01-2020",
        monto: 400,
      },
    ],
  },
],
prestamos: [
  {
    motivo: "adelanto",
    fechaEmision: "13-01-2020",
    montoTotalAPagar: 12000,
    montoCuota: 500,
    cuotasTotales:12,
    cuotasPendientes: 4
  },
  {
    motivo: "inversion",
    fechaEmision: "13-01-2020",
    montoTotalAPagar: 2000,
    montoCuota: 20,
    cuotasTotales:10,
    cuotasPendientes: 4
  },
],
servicios: [
  {
    tipo: "Luz",
    servicioId:1,
    fechaVencimiento: "13-01-2020",
    montoTotalAPagar: 12000,
  },
  {
    tipo: "Gas",
    servicioId:2,
    fechaVencimiento: "13-01-2020",
    montoTotalAPagar: 12000,
  },
  {
    tipo: "Agua",
    servicioId:3,
    fechaVencimiento: "13-01-2020",
    montoTotalAPagar: 12000,
  },
  {
    tipo: "Patente",
    servicioId:4,
    fechaVencimiento: "13-01-2020",
    montoTotalAPagar: 12000,
  },
  {
    tipo: "Seguro",
    servicioId:5,
    fechaVencimiento: "13-01-2020",
    montoTotalAPagar: 12000,
  },
  {
    tipo: "ABL",
    servicioId:6,
    fechaVencimiento: "13-01-2020",
    montoTotalAPagar: 12000,
  },
],
} */
