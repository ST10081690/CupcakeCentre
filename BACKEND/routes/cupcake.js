//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

const express = require('express')
const router = express.Router();
const Cupcake = require('../models/cupcake')
const checkauth = require('../check-auth')

//getting all cupcakes
router.get('',checkauth, async (req, res) => {
    Cupcake.find().then((cupcakes)=>{
        res.json(
            {
                message: "Cupcakes Found:",
                cupcakes: cupcakes
            }
        )
    })
})

//getting all posts
router.get('/my-posts', checkauth, async (req, res) => {
    const allPosts = await Cupcake.find();
    res.send(allPosts);
})

//making a new post
router.post('', checkauth, (req, res) => {
    const cupcake = new Cupcake(
        {
            id: req.body.id,
            flavour: req.body.flavour,
            supplier: req.body.supplier
        }
    )
    cupcake.save().then(()=>{
        res.status(201).json({
            message: 'Item Created!',
            cupcake: cupcake
     })
    
    })
})

//deleting a post
router.delete('/:id', checkauth, (req, res) => {
    Cupcake.deleteOne({_id: req.params.id})
    .then((result) => 
    {
        res.status(200).json({message: "Item Deleted"});
    });

})

module.exports = router