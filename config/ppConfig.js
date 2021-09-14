const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// Database
const { User } = require('../models')

const STRATEGY = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	async (email, password, cb) => {
		try {
			const user = await User.findOne({
				where: { email }
			})

			if (!user || !user.validPassword(password)) {
				cb(null, false)
			} else {
				cb(null, user)
			}
		} catch (err) {
			console.log('------- Error below -----------')
			console.log(err)
		}
	}
)

// Passport "serialize" info to be able to login
passport.serializeUser((user, cb) => {
	cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
	try {
		const user = await User.findByPk(id)

		if (user) {
			cb(null, user)
		}
	} catch (err) {
		console.log('---- Yo... There is an error ----')
		console.log(err)
	}
})

passport.use(STRATEGY)
module.exports = passport
