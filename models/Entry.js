const { Schema, model } = require("mongoose");

const entrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    entry: String,
    date: { type: Date, default: Date.now }, 
  }
)



const Entry = model("Entry", entrySchema);

module.exports = Entry;