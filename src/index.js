import server from "./routes/server.js";
import { dbConnect } from "./db/config.js";

server.createServer(dbConnect);
