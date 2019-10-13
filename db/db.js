require("dotenv").config();
const mongoose = require("mongoose");

const mongodbConnect = async () => {
  try {
    //connectar till min databas
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    });
  } catch (err) {
    console.log(err.message);

    process.exit(1);
  }

  console.log("connected to DB!!!");
};

//exporterar mongodb
module.exports = mongodbConnect;
