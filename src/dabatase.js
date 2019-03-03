const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/notes-app', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(db => console.log('DB is connected'))
  .catch(db => console.log('DB is not connected'))
