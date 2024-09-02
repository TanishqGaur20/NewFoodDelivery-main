const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    phone: {
        type: 'number',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String',
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const userCollection = new mongoose.model('user', userSchema)

module.exports = userCollection;