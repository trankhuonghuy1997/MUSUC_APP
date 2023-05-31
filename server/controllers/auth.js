const admin = require("../config/firebase.config");
const User = require("../models/user");

exports.getUser = (req, res, next) => {
  res.send("OK");
};

exports.getLogin = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];

  const decodeValue = await admin.auth().verifyIdToken(token);
  if (!decodeValue) {
    res.status(500).json({ message: "Unauthorized!" });
  } else {
    const userExist = await User.findOne({ user_id: decodeValue.user_id });
    if (!userExist) {
      newUserData(decodeValue, req, res);
    } else {
      updateNewUser(decodeValue, req, res);
    }
  }
};

const newUserData = (decodeValue, req, res) => {
  const newUser = new User({
    name: decodeValue.name,
    email: decodeValue.email,
    imageUrl: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  newUser
    .save()
    .then(() => {
      res.status(200).send({ user: newUser });
    })
    .catch((err) => {
      res.status(400).send({ succcee: false, message: err });
    });
};

const updateNewUser = (decodeValue, req, res) => {
  User.findOneAndUpdate(
    { user_id: decodeValue.user_id },
    { auth_time: decodeValue.auth_time },
    { new: true, upsert: true }
  )
    .then((result) => {
      res.status(200).send({ user: result });
    })
    .catch((err) => {
      res.status(400).send({ succcee: false, message: err });
    });
};
