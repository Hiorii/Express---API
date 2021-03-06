const express = require('express');
const helmet = require("helmet");
const app = express();
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');

const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.g9pgz.mongodb.net/new_wave?retryWrites=true&w=majority` : 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', ()=> {
    console.log('Connected to the database');
});
db.on('error', (err) => {
    console.log(`Error:  ${err}`)
});

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server, {
    cors: {
        origin: '*',
    }
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

io.on('connection', (socket)=> {
    console.log('New socket!');
});

app.use((req,res)=> {
    res.status(404).send('Error 404...')
});

module.exports = server;
