const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');

const server = app.listen(8000, ()=> {
    console.log('Server connected');
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
app.use(express.static(path.join(__dirname + '/client/public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

io.on('connection', (socket)=> {
    console.log('New socket!');
});

app.use((req,res)=> {
    res.status(404).send('Error 404...')
});
