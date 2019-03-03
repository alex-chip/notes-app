const express = require('express')
const router = express.Router()
const User = require('../models/User')
const password = require('passport')

router.get('/users/signin', (req, res) => {
  res.render('users/signin')
})

router.post('/users/signin', password.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}))

router.get('/users/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  console.log(req.body)

  if (name.length <= 0) {
    errors.push({text: 'Please Insert your name'})
  }

  if (email.length <= 0) {
    errors.push({text: 'Please Insert your Email'})
  }

  if (password.length <= 0) {
    errors.push({text: 'Please Insert your password'})
  }

  if (confirmPassword.length <= 0) {
    errors.push({text: 'Please Insert your Confirm Password'})
  }

  if (password !== confirmPassword) {
    errors.push({text: 'Password do not match'})
  }

  if (password.length < 4) {
    errors.push({text: 'Password must be at least 4 characters'})
  }

  if (errors.length > 0) {
    res.render('users/signup', {errors, name, email, password, confirmPassword})
  } else {
    const emailUser = await User.findOne({email: email})
    if (emailUser) {
      req.flash('error_msg', 'The Email is already in use')
      res.redirect('/users/signup')
    }
    const newUser = new User({name, email, password})
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    req.flash('success_msg', 'You are registered')
    res.redirect('/users/signin')
  }
})

router.get('/users/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
