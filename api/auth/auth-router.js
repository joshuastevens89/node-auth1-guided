const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../users/users-model.js') 


router.post('/register', async (req, res, next) => {
  try {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash
    const saved = await User.add(user)
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  res.json({ message: "login" })
})

router.get('/logout', async (req, res, next) => {
  res.json({ message: "logout" })
})

module.exports = router