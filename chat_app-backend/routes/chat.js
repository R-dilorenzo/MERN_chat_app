const router = require("express").Router();
const verify = require("./verifyToken");
//importo lo schema (table) user
const Conversation = require("../model/Conversation");
const User = require("../model/User");

// passo il token(verify) negli header
// la request è un object con: { _id, iat (token) }
router.get("/", verify, async (req, res) => {
  // req.user => JSON: { _id, iat }
  // res.send(req.user);
  const user = await User.findById({ _id: req.user._id });
  res.send(user);
});

// creo una nuova chat nel DB
router.post("/new/conversation", (req, res) => {
  const dbData = req.body;
  //con i dati passati dal body creo una nuova collection nel db
  Conversation.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// aggiunge (salva) i messaggi passati nel DB
router.post("/new/message", (req, res) => {
  Conversation.updateOne(
    //utilizzo id della conversazione già creata
    { _id: req.query.id },
    // aggiungo il messaggio nell array conversation della chat trovata attraverso la query
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log("Error saving message:");
        console.log(err);

        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

//restiuisce le ultime informazioni di tutte le chat presenti
router.get("/get/conversationList", (req, res) => {
  Conversation.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      //ordino i messaggi recuperati
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });

      let conversations = [];

      data.map((conversationData) => {
        const conversationInfo = {
          id: conversationData._id,
          name: conversationData.chatName,
          timestamp: conversationData.conversation[0].timestamp,
        };

        conversations.push(conversationInfo);
      });

      res.status(200).send(conversations);
    }
  });
});

//restituisce intera conversazione di una chat
router.get("/get/conversation", (req, res) => {
  const id = req.query.id;

  Conversation.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//aggiorna la lista delle chat con le informazioni (messaggio, avatar, timestamp) dell ultimo messaggio mandato
router.get("/get/lastMessage", (req, res) => {
  const id = req.query.id;

  Conversation.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let convData = data[0].conversation;

      convData.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });

      res.status(200).send(convData[0]);
    }
  });
});

// aggiorno tutte le occorrenze di user.photo trovate nella collection conversation
router.post("/setPhoto/conversation", (req, res) => {
  // updateMany => aggiorna in tutti i document
  Conversation.updateMany(
    // <query>
    //utilizzo uid user in param
    { "conversation.user.uid": req.query.uid },
    // <update>
    // $set per aggiornare con positional operator ($) essendo un array
    /**
     * $   => aggiorna solo il primo elemento trovato negli array
     * $[] => aggiorna tutti gli elementi trovati
     * $[<condition>] => aggiorna tutti gli elementi trovati nei documenti che soddisfano
     *                   la condizione definita da arrayFilters
     */
    { $set: { "conversation.$[elem].user.photo": req.body.photo } },
    // <option>
    { arrayFilters: [{ "elem.user.uid": req.query.uid }] },
    (err, data) => {
      if (err) {
        console.log("Error aggiornamento foto in conversation:");
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

module.exports = router;
