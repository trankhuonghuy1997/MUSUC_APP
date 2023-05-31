const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    email_verified: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    auth_time: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
