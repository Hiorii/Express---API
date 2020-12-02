const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req,res)=> {
    res.json(db.db.testimonials);
});

router.route('/testimonials/random').get((req,res)=> {
    const random = db.db.testimonials[Math.floor(Math.random() * db.db.length)];
    res.json(random);
})

router.route('/testimonials/:id').get((req,res)=> {
    res.json(db.db.testimonials.filter(testimonial => testimonial.id === parseInt(req.params.id)));
});

router.route('/testimonials').post((req,res)=> {
    const {author, text} = req.body;
    const id = new Date().getUTCMilliseconds();
    db.db.testimonials.push({
        id: id,
        author: author,
        text: text,
    });
    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req,res)=> {
    const {author, text} = req.body;
    const id = parseInt(req.params.id);
    const editedItem = db.db.testimonials.find(testimonial => testimonial.id === id);
    const indexOfEditedItem = db.db.testimonials.indexOf(editedItem);

    db.db.testimonials[indexOfEditedItem] = {
        ...editedItem,
        author: author,
        text: text,
    };

    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req,res)=> {
    const id = parseInt(req.params.id);
    const deletedItem = db.db.testimonials.find(testimonial=> testimonial.id === id);
    const indexOfDeletedItem = db.db.testimonials.indexOf(deletedItem);

    db.db.testimonials.splice(indexOfDeletedItem, 1);

    res.json({ message: 'OK' });
});

module.exports = router;
