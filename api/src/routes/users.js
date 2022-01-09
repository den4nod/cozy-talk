const express = require('express')
const db = require('../services/db')
const bodyParser = require('body-parser')

const router = express.Router()
const jsonParser = bodyParser.json()

router.get('/', async function (req, res) {
  res.json(await db('users').orderBy('user_id'))
})

router.post('/', jsonParser, async function (req, res) {
  console.log(req.body)
  const { name, email, phone } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Name cannot be empty' })
  }
  if (!email) {
    return res.status(400).json({ error: 'Email cannot be empty' })
  }
  if (!phone) {
    return res.status(400).json({ error: 'Phone cannot be empty' })
  }
  await db('users')
    .insert({ name: name, email: email, phone: phone })
    .then(() => res.json({ status: 'success' }))
    .catch((error) => {
      return res.status(400).json({ error: error.name })
    })
})

router.get('/:id', async function (req, res) {
  const { id } = req.params
  res.json(await db('users').where({ user_id: id }))
})

router.put('/:id', jsonParser, async function (req, res) {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: 'User id cannot be empty' })
  }
  const { name, email, phone } = req.body
  await db('users')
    .where({ user_id: id })
    .update({ name: name, email: email, phone: phone })
    .then(() => res.json({ status: 'success' }))
    .catch((error) => {
      return res.status(400).json({ error: error.name })
    })
})

router.delete('/:id', function (req, res) {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: 'User id cannot be empty' })
  }
  db('users')
    .where({ user_id: id })
    .del()
    .then(() => res.json({ status: 'success' }))
    .catch((error) => {
      return res.status(400).json({ error: error.name })
    })
})

module.exports = router
