const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  colour: {
    type: String
  },
  invitedRooms: [
    {
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"
      }
    }
  ],
  joinedRooms: [
    {
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room"
      }
    }
  ]
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
