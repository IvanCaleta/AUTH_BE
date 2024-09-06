const express = require("express");
const mongoose = require('mongoose');
const router = require('./routes/routes');
const cors = require('cors');
const app = express();
require("dotenv").config();


mongoose.connect(process.env.DB_URI + process.env.DB_NAME)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', router)


app.listen(process.env.PORT,()=>{
    console.log(`Server started on port: ${process.env.PORT}`)
})