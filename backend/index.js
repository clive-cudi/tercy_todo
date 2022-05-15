const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const cors = require('cors');
const authRouter = require('./routes/auth');
const http = require('http');
const server = http.createServer(app);

console.log(MONGO_URI)

app.use(cors());

mongoose.connect(MONGO_URI, {useNewUrlParser: true});

app.use('/auth', authRouter);

const connection = mongoose.connection;

connection.once('open',()=>{
    console.info('Connected to MongoDB');
})

app.listen(PORT, ()=>{
    console.info(`Server up and running at port ${PORT}`);
})
