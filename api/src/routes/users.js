const express = require('express')
const db = require('../services/db')
const bodyParser = require('body-parser')

const router = express.Router()
const jsonParser = bodyParser.json()

const USERS_TABLE = 'users'
const SUCCESS_JSON_RESPONSE = { status: 'success' }
const BAD_REQUEST_STATUS_CODE = 400

const errorJsonResponse = (error) => {
  return { error: error }
}

router.get('/', async function (req, res) {
  res.json(await db(USERS_TABLE).orderBy('user_id'))
})

router.post('/', jsonParser, async function (req, res) {
  const { name, email, phone } = req.body
  if (!name) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Name cannot be empty'))
  }
  if (!email) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Email cannot be empty'))
  }
  if (!phone) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('Phone cannot be empty'))
  }
  await db(USERS_TABLE)
    .insert({ name: name, email: email, phone: phone })
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.get('/:id', async function (req, res) {
  const { id } = req.params
  res.json(await db(USERS_TABLE).where({ user_id: id }))
})

router.put('/:id', jsonParser, async function (req, res) {
  const { id } = req.params
  if (!id) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('User ID cannot be empty'))
  }
  const { name, email, phone } = req.body
  await db(USERS_TABLE)
    .where({ user_id: id })
    .update({ name: name, email: email, phone: phone })
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

router.delete('/:id', function (req, res) {
  const { id } = req.params
  if (!id) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .json(errorJsonResponse('User ID cannot be empty'))
  }
  db(USERS_TABLE)
    .where({ user_id: id })
    .del()
    .then(() => res.json(SUCCESS_JSON_RESPONSE))
    .catch((error) => {
      return res
        .status(BAD_REQUEST_STATUS_CODE)
        .json(errorJsonResponse(error.name))
    })
})

module.exports = router
