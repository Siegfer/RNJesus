const express = require('express')
const router = express.Router()

const { User, boardgame, usergamelist } = require('../models')

router.get('/', (req, res) => {
	res.render('boardgames')
})

module.exports = router
