'use strict';
const userRoutes = require('./usersRoutes')


const mainRoutes = (app) => {
    app.route('/')
    .get((_, res) => {
        res.status(200).json({mesassge: "Welcome Recipes API"})
    })
    app.use('/api/users', userRoutes)
}

module.exports = mainRoutes

