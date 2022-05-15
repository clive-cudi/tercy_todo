const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI ?? `mongodb+srv://myadmin:add1234@cluster0.szi0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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


server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(MONGO_URI);
})