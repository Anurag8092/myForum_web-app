const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    userEmail:{
        type: String,
        required: true,
        ref: "user"
    },
    userName:{
        type: String,
        required: true,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    timestamp: {
        type: String
    },
    replies: [{
        name: String,
        reply: String,
        timestamp: String
      }]
})

module.exports = mongoose.model("note", NoteSchema)



