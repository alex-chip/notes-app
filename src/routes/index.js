const express = require('express')
const router = express.Router()

// Importar los enturadores
const routerNotes = require('./notes')
const routerUsers = require('./users')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/about-us', (req, res) => {
  res.render('about-us')
})

router
  .use(routerNotes)
  .use(routerUsers)

module.exports = router
