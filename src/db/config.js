import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ypd2l.mongodb.net/TP2?retryWrites=true&w=majority`;

export const dbConnect = () =>
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log("Conectado a la bd!");
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
