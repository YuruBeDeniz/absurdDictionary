const { Schema, model } = require("mongoose");

const entrySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    entry: String,
    createdAt: { type: Date, default: Date.now }, 
  }
)
//createdAt
//body


const Entry = model("Entry", entrySchema);

module.exports = Entry;