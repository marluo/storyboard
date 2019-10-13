const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  roomname: {
    type: String,
    required: true
  },
  ownroomname: {
    type: String,
    required: true,
    default: "sug min kuk"
  },
  privacy: {
    type: Boolean,
    required: true
  },
  invitedUsers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  joinedUsers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ],
  messages: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      message: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  messageSettings: {
    limitedMessages: {
      type: Number,
      default: 2,
      required: true
    },
    maxMessages: {
      type: Number,
      default: 100,
      required: true
    }
  }
});

const Room = mongoose.model("room", RoomSchema);
module.exports = Room;
