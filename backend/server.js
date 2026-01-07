const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const net = require('net');
require("dotenv").config();

const app = express();

function getAvailablePort(startPort) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.on('error', () => {
      server.close();
      resolve(getAvailablePort(startPort + 1));
    });
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close();
      resolve(port);
    });
  });
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SRMS Backend Server Running" });
});

getAvailablePort(5001).then(port => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
