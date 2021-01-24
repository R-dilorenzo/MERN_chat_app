const router = require("express").Router();
//importo lo schema (table) user
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTRAZIONE
//Registro un nuovo utente nel DB
router.post("/register", async (req, res) => {
  //controllo che i valori passati sia validi
  //  const {error} = Joi.validate(req.body,schema);
  const { error } = registerValidation(req.body);
  //se c'è un errore nella validazione restituisco il messaggio di errore
  if (error) return res.status(400).send(error.details[0].message);
  //controllo se utente è già nel database (se esiste un utente con la stessa mail)
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email già presente");
  //eseguo Hash della password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //altrimenti
  //creo un oggetto utente
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  //salvo oggetto nel DB
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN senza token
router.get("/login2", (req, res) => {
  const email = req.query.email;
  const name = req.query.name;

  User.find({ email: email, name: name }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      //restituisce user con email e name passati come parametri
      res.status(200).send(data);
    }
  });
});

// aggiorno tutte le occorrenze di photo trovate nella collection users
router.post("/setPhoto/user", (req, res) => {
  //Deprecato
  // User.findByIdAndUpdate(
  //   {"_id":req.query._id},
  //   {"photo":req.body.photo},
  //   (err,data) => {
  //     if (err) {
  //       console.log("Error aggiornamento foto in user:");
  //       console.log(err);
  //       res.status(500).send(err);
  //     } else {
  //       res.status(201).send(data);
  //     }
  //   }
  // );

  // updateOne
  User.updateOne(
    // <query>
    { _id: req.query._id },
    // <update>
    { photo: req.body.photo },
    (err, data) => {
      if (err) {
        console.log("Error aggiornamento foto in user:");
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

//LOGIN con token
router.post("/login", async (req, res) => {
  //controllo che i valori passati sia validi altrimenti restituisco errore
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //controllo se utente è presente nel db (email esiste)
  const user = await User.findOne({ email: req.body.email });
  //se non è presente (utente non registrato) manda errore
  if (!user) return res.status(400).send("Email non corretta");
  //password è corretta
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password non corretta");

  //creo e assegno un token all utente che corrisponde all id
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  //viene mandata come res negli header un token avente nome:auth-token e value:<token>
  res.header("auth-token", token).send(token);
});

module.exports = router;
