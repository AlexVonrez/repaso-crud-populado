const express = require('express')
const router = express.Router()
const parques = require('../models/Park.model')

// Endpoints

router.get('/new' , (req , res, next ) => {res.render('pages/parks/new-park')
    .catch(err => console.log(err))
})

router.post('/new', (req,res,next)=> {
    const {name,description} = req.body
    console.log(name,description)

    parques.create({name,description})
    .then(() => res.render ('pages/parks/new-park'))
    .catch(err => console.log(err))

})




module.exports = router
