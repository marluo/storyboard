const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Room = require("../models/Room");
const User = require("../models/User");
const decode = require("../middleware/decode");

const router = express.Router();

// const randomRoomGenerator = () => {
//   const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
//   let randomletter = "";
//   for (i = 0; i < 7; i++) {
//     randomletter += alphabet[Math.floor(Math.random() * alphabet.length)];
//   }
//   return randomletter;
// };

/*
route - /api/createroom
privacy - protected
desc - create a room aeg4r


*/

/* SKAPA ETT RUM */
/* JOINA ETT RUM */
/* INVITEA TILL ETT RUM */
/* HÄMTA ETT RUM */

// FRONT END - Ta längden av arrayen - 2, och ersätt varje sträng med något.

/* skapa ett rum */

router.get("/api/rooms/", async (req, res) => {
  const room = await Room.find({ privacy: false });
  if (!room) {
    return res.status(202).json({ message: "there are no rooms" });
  }

  return res.status(202).json(room);
});

router.post("/api/createroom/", decode, async (req, res) => {
  const { privacy, limitedMessages, maxMessages, ownroomname } = req.body;

  console.log("room");
  //skapar en ny instans av ett rum
  const newRoom = new Room({
    privacy,
    admin: req.userid,
    "messageSettings.maxMessages": maxMessages,
    "messageSettings.limitedMessages": limitedMessages,
    ownroomname: ownroomname
  });

  //hämtar ut rummet,
  newRoom.roomname = newRoom.id.substring(0, 8);

  await newRoom.save();

  res.status(202).json(newRoom);
});

// /*

// HÄMTAR ETT RUM
// ROUTE - '/api/getroom/{id}

// PRIVACY - BOTH

// */

router.get("/api/getroom/:roomname", async (req, res) => {
  const room = await Room.findOne({ roomname: req.params.roomname })
    .populate("messages.user", ["-password"])
    .sort({ "messages.date": -1 });

  if (!room) {
    return res.status(404).send("no room found by that id");
  }

  const checkJoined = () => {
    for (user in room.joinedusers) {
      if (req.userid === user) {
        return res.status(202).json(room);
      }
      return res.status(202).send("You are not authorized to join this room");
    }
  };

  if (room.privacy === true) {
    if (room.admin === req.userid || checkJoined()) {
      return res.status(202).json(room);
    }
  } else {
    return res.status(202).json({ room, length: room.messages.length });
  }
});

// /*
// INVITE A USER TO ROOM

// */

router.put("/api/:roomname/inviteuser", decode, async (req, res) => {
  try {
    const { username } = req.body;
    console.log(req.userid);

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).send("No user found by that id");
    }

    //hämtar endast rummet om användaren inte har blivit invitead
    const room = await Room.findOne({
      roomname: req.params.roomname,
      //mongoOperator för att se till att användaren inte är invited
      //$nin hämtar endast dokumentet om inte
      "invitedUsers.user": { $nin: [user.id] }
    });
    //SKRIV OM KOD SÅ VI PUSHAR IN VIA MONGOOPERATOR SEN ISTÄLLET!!!!!

    //skickar tillbaka om rummet inte finns, eller om användaren inte blivit invitead
    if (!room) {
      return res
        .status(404)
        .send(
          "Cant invite someone who has already been invited & room doesn't exist"
        );
    }

    room.invitedUsers.push({ user: user.id });
    //in med jävlen i arrayen
    await room.save();

    //Pusha in till InvitedRooms i table för user
    user.invitedRooms.push({ room: room.id });
    await user.save();

    return res.status(202).send({ room, user });
  } catch (error) {
    console.error(error);
  }
});

/* JOIN A ROOM */

router.put("/api/:roomname/join", decode, async (req, res) => {
  try {
    const user = await User.findById(req.userid);

    const room = await Room.findOne({
      roomname: req.params.roomname,
      //mongoOperator för att se till att användaren är invited
      //$in hämtar endast dokumentet om användare finns
      "invitedUsers.user": { $in: [user.id] }
    });

    //om rummet inte finns. Hämtas endast om användare finns i arrayen inviteduser.user
    if (!room) {
      return res
        .status(404)
        .send("room doesn't exist or you have not been invited");
    }

    //om ingen user finns
    if (!user) {
      return res
        .status(404)
        .send("Can't invite a user that has already joined!");
    }

    //filters the array to only include the it if the user has joined
    const checkIfJoined = room.joinedUsers.filter(
      joined => joined.user == user.id
    );

    //if length of array is greater than 1, we know the user already joined the room
    if (checkIfJoined.length > 0) {
      return res.status(404).send("You have already joined this room");
    }

    //Pusha in till array JoinedUsers i Roomet
    room.joinedUsers.push({ user: user.id });
    room.invitedUsers = room.invitedUsers.filter(
      invited => invited.user != user.id
    );

    //Pusha in till JoinedRooms i table för user
    //filtrera endast bort användaren från invited, om det är privat rum
    user.invitedRooms = user.invitedRooms.filter(
      invited => invited.room != room.id
    );
    user.joinedRooms.push({ room: room.id });

    await user.save();
    await room.save();

    res.status(202).json({ room, user });
  } catch (error) {}
});

/* GET ALL ROOMS YOU ARE INVITED TO */

router.get("/api/getuser/", decode, async (req, res) => {
  const user = await User.findById(req.userid);

  res.send(user);
});

router.get("/api/rooms/joined", decode, async (req, res) => {
  const { userid } = req.body;

  const user = await User.findById(req.userid);
  console.log(user);

  const room = await Room.find({
    "joinedRooms.user": { $in: [user.id] }
  });

  if (!room) {
    return res.send("you are not invited to any rooms");
  }

  return res.status(202).json(room);
});

/* GET ALL ROOMS YOU HAVE JOINED */

router.get("/api/rooms/invited", async (req, res) => {
  //hämta alla rum du är invited till
  const room = await Room.find({
    invitedUsers: { $elemMatch: { user: req.userid } }
  });

  if (!room) {
    return res.send("You have not joined any rooms");
  }

  return res.status(202).send(room);
});

/* POST A MESSAGE TO A ROOM */

router.put("/api/messageroom/:roomname/", decode, async (req, res) => {
  const { message } = req.body;
  console.log(message);

  try {
    const room = await Room.findOne({ roomname: req.params.roomname })
      .populate("messages.user")
      .sort({
        "messages.date": 1
      });

    const user = await User.findById(req.userid);

    //middleware?
    const checkAuth = () => {
      if (room.privacy === true) {
        for (user of room.joinedusers) {
          if (userid == user.user) {
            return true;
          }
        }
        return false;
      }
      return true;
    };

    if (!room) {
      return res.status(202).send("There is no room by this id");
    }

    if (checkAuth() === false) {
      return res
        .status(202)
        .send("You are not authorized to post messages to this room");
    }
    //populatea istället om användare byter färg? Skicka in ID på användare ist via backend */

    const limitMessages = limit => {
      //if the room message has reached the max room limit, return and don't do anything
      if (room.messageSettings.maxMessages === room.messages.length) {
        return res.send("Room limit have been reached");
      }

      //if limitedmessages is equal or longer than current messages in room, we need logic to skip logic down
      if (room.messages.length <= room.messageSettings.limitedMessages) {
        return { condition: false };
      }

      let counter = 0;
      for (i = 0; i < 3; i++) {
        //if id of last message equals
        if (room.messages && room.messages[i].user.id == user.id) {
          counter++;
          if (counter === 3) {
            return { limit: 3, condition: true };
          }
        }
      }
      return { condition: false };
    };

    //passa in limit för messages och kolla om X senaste användare har gjort meddelande
    const conditionLimited = limitMessages(
      room.messageSettings.limitedMessages
    );

    if (conditionLimited.condition) {
      return res.send(
        `You can only post ${conditionLimited.limit} messages to this room`
      );
    }

    const newMessage = {
      user: req.userid,
      message
    };

    //pusha in meddelande i början av arrayen

    room.messages.push(newMessage);

    //populatea rummet efteråt, eftersom att vi inte uppdaterar och gör allt med mongooperators istället.
    const populatedRoom = await room
      .save()
      .then(model => model.populate("messages.user").execPopulate());

    var io = req.app.get("socketio");
    io.emit("message", populatedRoom);
    return res.status(202).send(room);
  } catch (error) {
    console.log(error);
  }
});

/* UPDATE A COLOR ON A USER */

router.put("/api/user/colour/", async (req, res) => {
  const { colour } = req.body;

  const user = User.findOne(
    { username: req.user },
    {
      $set: { colour }
    },
    { new: true }
  );

  if (!user) {
    return res
      .status(404)
      .send("User not found or that user doesn't belong you");
  }

  return res.status(202).send(user);
});

module.exports = router;
