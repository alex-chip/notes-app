const express = require('express')
const router = express.Router()

router.get('/users/signin', (req, res) => {
  res.render('users/signin')
})

router.get('/users/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/users/signup', (req, res) => {
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
    res.send('ok')
  }
})

module.exports = router
