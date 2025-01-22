import { io } from "../app.js";
io.on("connection", (socket) => {
  console.log("New connection in socket");
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
