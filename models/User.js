const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please tell us your name!"]
    },
    password: {
      type: String,
      minlength: 4,
      required: [true, "Please provide a password!"]
    },
    email: {
      type: String,
      unique: true
    },
    imageURL: String,
    entries: [{type: Schema.Types.ObjectId, ref: 'Entry'}],
    topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
