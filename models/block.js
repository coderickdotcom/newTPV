/*jshint esversion: 6 */

const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  title: String,
  description: String,
  color: String
});

const Block = mongoose.model('Block', blockSchema, 'blocks');

module.exports = Block;
