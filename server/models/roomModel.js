const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema( {
    name: { type: String, lowercase: true, unique: true, required: true },
    topic: { type: String},
    users: [],
    messages: [],
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Room', RoomSchema, "rooms");