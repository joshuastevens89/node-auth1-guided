const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../users/users-model.js') 


router.post('/register', async (req, res, next) => {
  
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    const newUser = { username, password: hash }
    const result = await User.add(newUser)
    res.status(201).json({ message: "registered" })
    console.log('result', result)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findBy({ username }).first()
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user
      res.status(200).json({ message: "logged in" })
    } else {
      next({ status: 401, message: "invalid credentials" })
    }       
  } catch (err) {
    next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    const { username } = req.session.user
    req.session.destroy(err => {
      if (err) {
        res.json({ message: "error logging out" })
      } else {
        res.status(200).json({ message: `logged out ${username}` })
      }
    })  
  } else {
    res.json({ message: "no session" })
  }
})

module.exports = router