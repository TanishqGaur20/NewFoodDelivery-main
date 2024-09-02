const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cartData: [
        {
            size: {
                type: String,
            },
            price: {
                type: Number,
            },
            quantity: {
                type: Number,
            },
            name: {
                type: String,
            },
            img: {
                type: String,
            },
            id: {
                type: String,
            },
            orderTime: {
                type: String,
            },
            email: {
                type: String,
            },
            location: {
                type: String,
            }
        }
    ]
})

const cartCollection = new mongoose.model('cartSchema', cartSchema)


module.exports = cartCollection