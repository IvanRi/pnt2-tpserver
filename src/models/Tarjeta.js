import mongoose from "mongoose";
const { Schema, model } = mongoose;

/**
 * ENTES EMISORES
 * 1: visa
 * 2: mastercard
 */

const movimientoTarjetaSchema = new Schema({
  descripcion: String,
  fecha: String,
  monto: Number,
});

export const movimientoTarjeta = new model(
  "MovimientoTarjeta",
  movimientoTarjetaSchema
);

export const tarjetaSchema = new Schema({
  isUsuario: Number,
  enteEmisor: String,
  nroTarjeta: String,
  fechaVencimiento: String,
  fechaCierre: String,
  saldo: Number,
  movimientos: [movimientoTarjetaSchema],
});

tarjetaSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

export const Tarjeta = model("Tarjeta", tarjetaSchema);

/**
 * 
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
 */
