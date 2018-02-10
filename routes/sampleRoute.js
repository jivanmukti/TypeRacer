const mongoose = require('mongoose');
const Questions = mongoose.model('First');
require('../model/questionModel');

module.exports = app => {
  app.post('/question', (req, res) => {
    // db.question.insert({ question1: "how are you?" })
    const { category, order, question, answer, one, two, three } = req.body;

    console.log('request body!!! ', req.body);

    Questions.create({ category, order, question, answer, one, two, three })
      .then(questions => {
        console.log('question!!!! ', questions);
        res.send(questions);
      })
      .catch(err => {
        console.log('ERROR ', err);
      });
  });
};
