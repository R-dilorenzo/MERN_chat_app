//import
const express = require("express");
const authRoute = require("./routes/auth"); //importo Routes
const chatRoute = require("./routes/chat"); //importo Routes
const uploadRoute = require("./routes/upload"); //importo Routes
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Pusher = require("pusher");

dotenv.config();

//app config
const app = express();

//db config
const mongoURI = process.env.DB_CONNECT; //inserire nella var DB_CONNECT (del file .env) URI presa da MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected....");

  //controllo se ci sono cambiamenti alla collection
  const changeStream = mongoose.connection.collection("conversations").watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("chats", "newChat", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("messages", "newMessage", {
        change: change,
      });
    } else {
      console.log("ERROR triggering Pusher...");
    }
  });
});

//middlewares
app.use(cors()); //per richieste tra backend e frontend
app.use(express.json()); //per leggere il body
//Routes middlewares
app.use("/api/user", authRoute); //tutte le route di auth.js si hanno con => localhost:{port}/api/user/<routes_auth>
//equivale a =>  app.get(...)
app.use("/api/chat", chatRoute);
app.use("/api/user", uploadRoute);

//listen
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
