import mongoose from "mongoose";
const { Schema, model } = mongoose;

/**
 * TIPOS DE CUENTA
 * 1: caja_ahorro
 * 2: cuenta_corriente
 *
 * MONEDAS
 * 1: pesos
 * 2: dolares
 *
 * TIPO DE MOVIMIENTO
 * 1: entrada - depositos/transferencias
 * 2: salida - debitos/tranferencias a terceros
 */

const movimientoCuentaSchema = new Schema({
  tipoMovimiento: String,
  descripcion: String,
  fecha: String,
  monto: Number,
  destino: String,
  origen: Number,
});

export const MovimientoCuenta = new model(
  "MovimientoCuenta",
  movimientoCuentaSchema
);

export const cuentaSchema = new Schema({
  idUsuario: Number,
  tipo: String,
  moneda: String,
  nroCuenta: String,
  saldo: Number,
  movimientos: [movimientoCuentaSchema],
});

cuentaSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

export const Cuenta = model("Cuenta", cuentaSchema);

/* {
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
],*/
