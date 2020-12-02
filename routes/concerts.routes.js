const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req,res)=> {
    res.json(db.db.concerts);
});

router.route('/concerts/:id').get((req,res)=> {
    res.json(db.db.concerts.filter(concert => concert.id === parseInt(req.params.id)));
});

router.route('/concerts').post((req,res)=> {
    const {performer, genre, price, day, image} = req.body;
    const id = new Date().getUTCMilliseconds();
    db.db.concerts.push({
        id: id,
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
    });
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req,res)=> {
    const {performer, genre, price, day, image} = req.body;
    const id = parseInt(req.params.id);
    const editedItem = db.db.concerts.find(concert => concert.id === id);
    const indexOfEditedItem = db.db.concerts.indexOf(editedItem);

    db.db.concerts[indexOfEditedItem] = {
        ...editedItem,
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
    };

    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req,res)=> {
    const id = parseInt(req.params.id);
    const deletedItem = db.db.concerts.find(concert=> concert.id === id);
    const indexOfDeletedItem = db.db.concerts.indexOf(deletedItem);

    db.db.concerts.splice(indexOfDeletedItem, 1);

    res.json({ message: 'OK' });
});

module.exports = router;