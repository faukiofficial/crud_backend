const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Success to connect to MongoDB')
    } catch (error) {
        console.log('Error to connect to mongoDb', error.message)
    }
}

module.exports = connectDb