const sanitize = require('mongo-sanitize');
const Testimonial = require('../models/testimonials.model');

exports.getAll = async(req,res) => {
  try {
      res.json(await Testimonial.find());
  } catch (err) {
      res.status(500).json({message: err});
  }
};

exports.getById = async(req,res) => {
    try {
        const tes = await Testimonial.findById(req.params.id);
        if(!tes)  res.status(404).json({message: 'Not found'});
        else {
            res.json(tes);
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.addNew = async(req,res) => {
    const {author, text} = req.body;
    try {
        if (!author || !author.length || !text || !text.length) throw new Error('Data is not correct!');
        else {
            const cleanAuthor = sanitize(author);
            const cleanText = sanitize(text);
            const newTes = new Testimonial({
                author: cleanAuthor,
                text: cleanText,
            })
            await newTes.save();
            res.json(newTes);
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.update = async(req,res) => {
    const {author, text} = req.body;
    try {
        const tes = await(Testimonial.findById(req.params.id));
        if(!tes) res.status(404).json({message: 'Not found...'});
        else {
            tes.author = author;
            tes.text = text;
            await tes.save();
            res.json(tes);
        }
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.delete = async(req,res) => {
  try {
      const tes = await(Testimonial.findById(req.params.id));
      if(!tes) res.status(404).json({message: 'Not found...'});
      else {
          await Testimonial.deleteOne({_id: req.params.id});
          res.json(tes);
      }
  } catch (err) {
      res.status(500).json({err});
  }
};