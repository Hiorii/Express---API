const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/seats').get((req,res)=> {
    res.json(db.db.seats);
});

router.route('/seats/:id').get((req,res)=> {
    res.json(db.db.seats.filter(seat => seat.id === parseInt(req.params.id)));
});

router.route('/seats').post((req,res)=> {
    const {day, seat, client, email} = req.body;
    const id = new Date().getUTCMilliseconds();
    db.db.seats.push({
        id: id,
        day: day,
        seat: seat,
        client: client,
        email: email,
    });
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req,res)=> {
    const {day, seat, client, email} = req.body;
    const id = parseInt(req.params.id);
    const editedItem = db.db.seats.find(seat => seat.id === id);
    const indexOfEditedItem = db.db.seats.indexOf(editedItem);

    db.db.seats[indexOfEditedItem] = {
        ...editedItem,
        day: day,
        seat: seat,
        client: client,
        email: email,
    };

    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req,res)=> {
    const id = parseInt(req.params.id);
    const deletedItem = db.db.seats.find(seat=> seat.id === id);
    const indexOfDeletedItem = db.db.seats.indexOf(deletedItem);

    db.db.seats.splice(indexOfDeletedItem, 1);

    res.json({ message: 'OK' });
});

module.exports = router;