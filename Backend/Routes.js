const express = require('express')
const Router = express.Router();
const userCollection = require('./DataBase/SignupSchema')
const menu = require('./DataBase/MenuSchema')
const nodemailer = require('nodemailer');
const cartCollection = require('./DataBase/CartSchema')
const OrderFeedCollection = require('./DataBase/FeedbackSchema')

var Otp;
Router.post('/signup', async (req, res) => {

    const { name, password, phone, email } = req.body;

    const userExist = await userCollection.findOne({ email })
    if (userExist) {
        return res.send({ userExist: true, msg: 'user already exist' })
    }
    Otp = Math.floor(1000 + Math.random() * 9000)
    console.log(Otp);

    let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'gangstertg11@gmail.com',
            pass: 'sdwz ynua tynn oeiy'
        }
    });


    transporter.sendMail({
        from: 'Tanishq Gaur',
        to: `${email}`,
        subject: 'Welcome to Food Delivery Services ✅',
        text: `Your One-Time Password (OTP) for Food Delivery Registration is:
${Otp} This code is valid for the next 10 minutes. Please do not share this code with anyone. If you did not request this OTP, please ignore this email or contact our support team immediately.

Thank you ☺️,
Food Delivery (Tanishq) Support Team`,

    })
    console.log('email sent');

    res.json({ otp: Otp })

})

Router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userExist = await userCollection.findOne({ email })

    if (!userExist) {
        return res.status(400).send({ msg: 'no email registered', ok: false })
    }

    if (password === userExist.password) {
        return res.status(200).send({ msg: 'user Logged in', ok: true })
    } else {
        return res.status(400).send({ msg: 'incorrect password', ok: false })
    }


})


Router.get('/', async (req, res) => {
    const menuData = await menu.find({})
    res.send(menuData)

})

Router.post('/otp', async (req, res) => {
    // Run this in your MongoDB shell or in your code using the mongoose.connection.db command

    console.log(req.body);

    const { name, password, phone, email } = req.body.data;

    if (req.body.otp == Otp) {
        res.send({ success: true, msg: 'user created successfully' })
        await userCollection.create({ name, password, phone, email, isAdmin: false })
        console.log('user created');
    }
    else {
        res.send({ success: false, msg: 'Otp doesnt match' })
    }

})

Router.post('/cartData', async (req, res) => {
    try {
        // Log the incoming data for debugging
        console.log('Received data:', req.body);

        // Ensure req.body.modData is an array

        if (Array.isArray(req.body.modData)) {
            // Insert data into the database
            await cartCollection.create({ cartData: req.body.modData });
            console.log('Data added successfully');
            res.status(201).send({ success: true, message: 'Data added successfully' });
        } else {
            res.status(400).send({ success: false, message: 'Invalid data format' });
        }
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send({ success: false, message: 'Server error' });
    }
});


Router.get('/adminOrders', async (req, res) => {
    try {
        const data = await cartCollection.find({})
        let allData = await OrderFeedCollection.find({})

        res.json({ data: data, allDBfeedData: allData })
    } catch (error) {
        console.log(error);
    }
})
Router.post('/feedbackData', async (req, res) => {
    try {
        let feedData = req.body.feedData;

        for (let i = 0; i < feedData.length; i++) {
            const feedItem = feedData[i];

            // Log the _id being used for debugging
            console.log("Attempting to delete document with _id:", feedItem._id);

            // Delete the existing document with the same _id, if it exists
            const deleteResult = await OrderFeedCollection.deleteOne({ _id: feedItem._id });
            console.log("Delete result for _id:", feedItem._id, deleteResult);

            // Check if the delete was successful
            if (deleteResult.deletedCount > 0) {
                console.log("Document deleted successfully");
            } else {
                console.log("No document found to delete with _id:", feedItem._id);
            }
        }

        // Insert the new documents after ensuring old ones are deleted
        await OrderFeedCollection.insertMany(feedData);
        console.log("New feedback created successfully");


        res.json({ success: true });
    } catch (error) {
        console.error("Error during feedback operation:", error);
        res.json({ success: false, message: error.message });
    }
});

Router.post('/isAdmin', async (req, res) => {
    const { email } = req.body
    let user = await userCollection.findOne({ email })
    let isAdmin = user.isAdmin;
    res.json({ isAdmins: isAdmin })
})

Router.get('/getFeedbackDataforUser', async (req, res) => {
    let data = await OrderFeedCollection.find({})
    res.json({ data: data })
})

Router.post('/addNewMenuItem', async (req, res) => {

    const formData = req.body.formData;
    console.log(formData);

    await menu.create(formData)
    console.log('menu item added');

})
module.exports = Router