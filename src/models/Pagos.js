import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const pagosSchema = new Schema({
  dni: Number,
  servicio: String,
  fecha: String,
  monto: Number,
});

pagosSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

export const Pagos = model("Pago", pagosSchema);
