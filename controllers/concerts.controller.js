const Concerts = require('../models/concerts.model');

exports.getAll = async(req,res)=> {
    try {
        res.json(await Concerts.find());
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getById = async(req,res)=> {
    try {
        const con = await Concerts.findById(req.params.id);
        if(!con) res.status(404).json({message: 'Not found...'});
        else {
            res.json(con);
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.addNew = async(req,res)=> {
    const {performer, genre, price, day, image} = req.body;
    try {
        const newCon = new Concerts({
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image,
        })
        await newCon.save();
        res.json(newCon);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.update = async(req,res)=> {
    const {performer, genre, price, day, image} = req.body;
    try {
        const con = await(Concerts.findById(req.params.id));
        if(!con) res.status(404).json({message: 'Not found...'});
        else {
            con.performer = performer;
            con.genre = genre;
            con.price = price;
            con.day = day;
            con.image = image;
            await con.save();
            res.json(con);
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.delete = async(req,res)=> {
    try {
        const con = Concerts.findById(req.params.id);
        if(!con) res.status(404).json({message: 'Not found...'});
        else {
            await Concerts.deleteOne({_id: req.params.id});
            res.json(con);
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};