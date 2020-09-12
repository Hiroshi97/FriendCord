const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema( {
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    uid: {type: String, required: true}
})

module.exports = mongoose.model('Message', MessageSchema, "messages");