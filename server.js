const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDb = require('./config/db')
const path = require('path')

const productRoute = require('./routes/productRoute')

dotenv.config()

const port = process.env.PORT || 8000

const app = express()

connectDb()

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', productRoute)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
