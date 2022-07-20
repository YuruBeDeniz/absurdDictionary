const { Schema, model } = require("mongoose");

const topicSchema = new Schema(
  {
    name: {
        type: String,
        unique: true,
    },
    entries: [
        {       
         type: Schema.Types.ObjectId,
         ref: 'Entry'
        }
    ]
  }
);

const Topic = model("Topic", topicSchema);

module.exports = Topic;
