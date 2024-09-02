const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    CategoryName: String,
    name: String,
    img: String,
    options: [{
        regular: String,
        medium: String,
        large: String,
        half: String,
        full: String,
        _id: false
    }],
    description: String

}, { collection: 'menu' })

const menu = new mongoose.model('menu', menuSchema)


module.exports = menu