import http from "http";
import app from "./app/app.js";

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT, console.log(`server is runing at port ${PORT}`));
