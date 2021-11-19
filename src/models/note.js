const { model, Schema } = require("mongoose")

const notesSchema = new Schema({
  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  important: {
    type: Boolean,
    default: false,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
})

notesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Notes = model("Note", notesSchema)

module.exports = Notes
