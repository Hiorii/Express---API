const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req,res)=> {
    res.send(db.db.testimonials);
});

router.route('/testimonials/random').get((req,res)=> {
    const random = db.db.testimonials[Math.floor(Math.random() * db.length)];
    console.log('wow');
    res.json(random);
})

router.route('/testimonials/:id').get((req,res)=> {
    const id = parseInt(req.params.id);
    res.json(db.db.testimonials.filter((item)=> {
        return (
            item.id === id
        )
    }));
});

router.route('/testimonials').post((req,res)=> {
    const {author, text} = req.body;
    const id = new Date().getUTCMilliseconds();
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req,res)=> {
    const {author, text} = req.body;
    const id = req.params.id;
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req,res)=> {
    const {author, text} = req.body;
    const id = req.params.id;
    res.json({ message: 'OK' });
});

module.exports = router;