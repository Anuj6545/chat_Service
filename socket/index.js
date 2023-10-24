const express = require("express");
const app = express();

require("dotenv").config();

const port = 5500;

const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("chat", (user) => {
    const { senderId, activeChatId, message } = user;
    const NewUser = {
      senderId : activeChatId,
      activeChatId : senderId,
      message : message,
    };
    io.emit("chat", NewUser);
  });
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
