const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
// const server = http.createServer(app);
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './.env')});
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

app.use(cors());
app.use(express.json());


app.get('/', (req, res)=> {
    res.send('Hello World');
});

app.use('/auth', authRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(MONGO_URI);
})