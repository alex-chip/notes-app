const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')('_method')
const expresSession = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

// Initiliazations
const app = express()
require('./dabatase')
require('./config/passport')
const port = (process.env.PORT || 3000)
const viewDir = `${__dirname}/views`
const publicDir = express.static(`${__dirname}/public`)
const routes = require('./routes/index')

// Settings
app.set('views', viewDir)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: `${__dirname}/views/layouts/`,
  partialsDir: `${__dirname}/views/partials`,
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app
  .use(morgan('dev'))
  .use(express.urlencoded({extended: false}))
  .use(methodOverride)
  .use(expresSession({
    secret: 'mysecreatapp',
    saveUninitialized: true,
    resave: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// Routes
app.use(routes)

// Static File
app.use(publicDir)

// Server in listening
app.listen(port, () => {
  console.log(`Server on port: ${port}`)
})
