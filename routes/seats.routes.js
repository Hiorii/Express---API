const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/seats').get((req,res)=> {
    res.send(db.db.seats);
});

router.route('/seats/:id').get((req,res)=> {
    const id = parseInt(req.params.id);
    res.json(db.db.testimonials.filter((item)=> {
        return (
            item.id === id
        )
    }));
});

router.route('/seats').post((req,res)=> {
    const {day, seat, client, email} = req.body;
    const id = new Date().getUTCMilliseconds();
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req,res)=> {
    const {day, seat, client, email} = req.body;
    const id = req.params.id;
    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req,res)=> {
    const {day, seat, client, email} = req.body;
    const id = req.params.id;
    res.json({ message: 'OK' });
});

module.exports = router;