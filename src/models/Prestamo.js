import mongoose from "mongoose";
const { Schema, model } = mongoose;

const prestamoSchema = new Schema({
  dni: Number,
  montoOtorgado: Number,
  totalAPagar: Number,
  cantCuotas: Number,
  interes: Number,
  cuotasPendientes: Number,
  valorCuota: Number,
  fecha: String,
});

prestamoSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

export const Prestamo = model("Prestamo", prestamoSchema);
