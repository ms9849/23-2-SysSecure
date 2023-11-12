const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

class Server {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.setConfig();
  }

  init() {
    this.setRoutes();
    this.app.listen(this.port, () => {
      console.log(`Hello, Wolrd! in Port ${this.port}`);
    });
  }

  setRoutes() {
    this.app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    this.app.post("/result", (req, res) => {
      console.log(req.body.user_id);
      console.log(req.body.user_password);
      res.send(
        `Your Id : ${req.body.user_id}
        <br>Your Password : ${req.body.user_password}
        `
      );
    });

    this.app.use((req, res, next) => {
      res.send({ error: "404 NOT FOUND ERROR" });
    });
  }

  setConfig() {
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

let server = new Server(3000);
server.init();
