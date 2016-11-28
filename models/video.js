/*jshint esversion: 6 */

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  duration: Date,
  thumbnail: String,
  subject: String,
  theme: String,
  server: String,
  block: String,
  premium: String
});

videoSchema.index({'$**':'text'});

const Video = mongoose.model('Video', videoSchema, 'videos');

module.exports = Video;
