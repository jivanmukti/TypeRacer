const Data = require('./model/questionModel');

const dataController = {
  getData(req, res) {
    Data.find(req.body, function(err, data) {
      return res.send(data);
    });
  }
};
module.exports = dataController;
