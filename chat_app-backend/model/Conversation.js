const moongose = require("mongoose");

const conversationSchema = moongose.Schema({
  chatName: String,
  conversation: [
    {
      message: String,
      timestamp: String,
      user: {
        displayName: String,
        email: String,
        photo: String,
        uid: String,
      },
    },
  ],
});

module.exports = moongose.model("conversation", conversationSchema);
