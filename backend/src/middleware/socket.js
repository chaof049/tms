import { Server } from "socket.io";

export let setupSocketIO = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("A controller connected");

    socket.on("control-message", (message) => {
      console.log("Controller says:", message);

      io.emit("bot-message", message);
    });

    socket.on("disconnect", () => {
      console.log("Controller disconnected");
    });
  });
};
