const express = require('express')
const router = express.Router()
const Coaster = require('../models/Coaster.model')
const parques = require('../models/Park.model')
// Endpoints

router.get('/new' , (req , res, next ) => {
    parques
    .find()
    .then(allParques =>res.render('pages/coasters/new-coaster', {allParques}))
    .catch(err => console.log(err))
})

router.post('/new' , (req , res, next) => {
    const {name,description,inversions,length,park_id} = req.body
    console.log(req.body);
    Coaster.create({name,description,inversions,length,park_id})
    .then(() => res.redirect('/coasters'))
    .catch(err => console.log(err))
})

router.get('/', (req,res,next) => {
    Coaster
    .find()
    .populate('park_id')
    .then(coasters =>res.render('pages/coasters/coasters-index', {coasters}))
    .catch(err => console.log(err))
})

router.get("/:id", (req, res) => {
  const coasterId = req.params.id;
  Coaster
  .findById(coasterId)
  .populate('park_id')
  .then(coasters =>res.render("pages/coasters/coaster-details", { coasters }))
})

router.get('/delete/:id', (req, res) => {
    const coaster_id = req.params.id
    Coaster
        .findByIdAndRemove(coaster_id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
        
})

router.get('/edit', (req, res, next) => {

  const coasterPromise = Coaster.findById(req.query.id)
  const parksPromise = parques.find()

  Promise.all([coasterPromise, parksPromise])
    .then(results => res.render('coasters/edit-coaster', { coaster: results[0], parks: results[1] }))
    .catch(err => next(new Error(err)))
})

router.post('/edit', (req, res, next) => {
  const { name, description, inversions, length, park } = req.body

  Coaster.findByIdAndUpdate(req.query.id, { name, description, inversions, length, park_id: park })
    .then(() => res.redirect(`/coasters/${req.query.id}`))
    .catch(err => next(new Error(err)))
})



module.exports = router
