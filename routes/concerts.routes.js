const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req,res)=> {
    res.send(db.db.concerts);
});

router.route('/concerts/:id').get((req,res)=> {
    const id = parseInt(req.params.id);
    res.json(db.db.concerts.filter((item)=> {
        return (
            item.id === id
        )
    }));
});

router.route('/concerts').post((req,res)=> {
    const {performer, genre, price, day, image} = req.body;
    const id = new Date().getUTCMilliseconds();
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req,res)=> {
    const {performer, genre, price, day, image} = req.body;
    const id = req.params.id;
    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req,res)=> {
    const {performer, genre, price, day, image} = req.body;
    const id = req.params.id;
    res.json({ message: 'OK' });
});

module.exports = router;