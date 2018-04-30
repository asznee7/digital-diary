'use strict'

const express = require('express')
const { mapUserInfo } = require('../../utils/entity-mappers')
const { validateMiddleware, asyncMiddleware, checkAuthenticated } = require('../../utils/middlewares')

const router = new express.Router()

router.get('/me',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const authCookieData = req.authenticatedUser
    const resFormatted = mapUserInfo(authCookieData)
    res.json(resFormatted)
  })
)

module.exports = router
