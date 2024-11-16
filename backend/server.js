require('dotenv').config()

const express = require('express')

// instantiaing express app
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require("./routes/workouts")
const userRoutes = require('./routes/user')

// fires for every request that comes in
// the next arg is a function that needs to be run at the end to execute another middleware
// for example, this middleware will run before the get request and it will only go to the get request becasue we 
// called the next() funtion  

// looks to see if it has a body to the request and if it does, it passes it as a request obj to the apis' as req
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// using all the routes
// first argument is part of the url
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db which returns a promise
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // only start listening when successfully connected to db
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

