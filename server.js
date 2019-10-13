const express = require("express");
const mongoConnect = require("./db/db");
const userRoutes = require("./routes/users");
const roomRoutes = require("./routes/rooms");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();

//socket
const http = require("http");
const socketIO = require("socket.io");

app.use(express.json({ extended: false }));

app.use(userRoutes);
app.use(roomRoutes);

mongoConnect();

const server = http.createServer(app);
const io = socketIO(server);
app.set("socketio", io);

io.on("connection", socket => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log("wwww");
});

app.locals.io = io;
