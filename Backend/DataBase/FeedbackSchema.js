
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        enum: ['half', 'regular', 'full', 'medium', 'large']
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    orderTime: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
});

const OrderFeedCollection = mongoose.model('OrderFeedCollection', orderSchema);

module.exports = OrderFeedCollection;
