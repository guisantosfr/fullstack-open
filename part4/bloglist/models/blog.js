const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoUrl = process.env.MONGODB_URL

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(`Error connecting to ${error.message}`))

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)