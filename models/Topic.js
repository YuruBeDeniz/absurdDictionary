const { Schema, model } = require("mongoose");

const topicSchema = new Schema(
  {
    title: {
        type: String,
        unique: true,
    },
    entries: [
        {       
         type: Schema.Types.ObjectId,
         ref: 'Entry'
        }
    ],
    author: { type: Schema.Types.ObjectId, ref: 'User'}
  }
);

const Topic = model("Topic", topicSchema);

module.exports = Topic;
