const mongoose = require('mongoose')

async function dbConnect() {

    try {
        await mongoose.connect('mongodb+srv://tanishq:tanishq12345@cluster0.fanbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

        console.log('Database Connected');
    } catch (error) {
        console.log(error);

    }

}

module.exports = dbConnect;