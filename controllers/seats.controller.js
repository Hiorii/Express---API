const Seats = require('../models/seats.model');

exports.getAll = async(req,res) => {
  try{
      res.json(await Seats.find());
  } catch (err) {
      res.status(500).json({message: err});
  }
};

exports.getById = async(req,res) => {
  try {
      const seat = await Seats.findById(req.params.id);
      if(!seat) res.status(404).json({message: 'Not found...'});
      else {
          res.json(seat);
      }
  } catch (err) {
      res.status(500).json({message: err});
  }
};

exports.addNew = async(req,res) => {
  const {day, seat, client, email} = req.body;
  try {
      const newSeat = new Seats({
          day: day,
          seat: seat,
          client: client,
          email: email
      });
      await newSeat.save();
      res.json(newSeat);
  } catch (err) {
      res.status(500).json({message: err});
  }
};

exports.update = async(req,res) => {
  const {day, seat, client, email} = req.body;
  try {
      const sea = await(Seats.findById(req.params.id));
      if(!sea) res.status(404).json({message: 'Not found...'});
      else {
          sea.day= day;
          sea.seat= seat;
          sea.client= client;
          sea.email= email;
          await sea.save();
          res.json(sea);
      }
  } catch (err) {
      res.status(500).json({message: err});
  }
};

exports.delete = async(req,res) => {
  try {
      const seat = await(Seats.findById(req.params.id));
      if(!seat) res.status(404).json({message: 'Not found...'});
      else {
          await Seats.deleteOne({_id: req.params.id});
          res.json(seat);
      }
  } catch (err) {
      res.status(500).json({message: err});
  }
};