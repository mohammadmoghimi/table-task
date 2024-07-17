const lists = require('../models/listModel');

exports.getLists = (req, res) => {
  res.json({
    verticalList: lists.verticalList,
    horizontalList: lists.horizontalList,
  });
};

exports.addVerticalItem = (req, res) => {
  const newItem = req.body;
  lists.verticalList.push(newItem);
  res.json(newItem);
};

exports.addHorizontalItem = (req, res) => {
  const newItem = req.body;
  lists.horizontalList.push(newItem);
  res.json(newItem);
};
