import mongo from "mongoose";

mongo.connect(
  "",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Connection to MongoDB failed!");
      console.error(err);
    } else {
      console.log("Connected with MongoDB!");
    }
  }
);

export default mongo.connection;
