const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     age: { type: Number, required: true },
     address: { type: String, required: true },
     password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
