import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const serviciosSchema = new Schema({
  name: String,
  idServicio: Number,
  monto: Number,
  pagada: Boolean,
  vencimiento: String,
  fechaPago: String,
  dniTitular: Number,
});

serviciosSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

export const Servicio = model("Servicio", serviciosSchema);
