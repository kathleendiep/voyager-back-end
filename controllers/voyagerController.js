const express = require('express');
const Voyager = require('../models/voyager');
const router = express.Router();

// make routes
// INDEX: get 
// test this in thunderclient - get  localhost:3000/voyagers
router.get('/', async (req,res)=>{
    try{
        // assign to variable voyagers
        const voyagers = await Voyager.find() 
        res.send({
            status: true,
            data: voyagers
        })
    }catch(err){
        res.send({
            status: false,
            data: err.message
        })
    }

})
// CREATE: post
router.post('/', async (req,res)=>{
    try{
        const newVoyager = await Voyager.create(req.body)
        res.send({
            success: true, 
            data: newVoyager
        })
    }catch(err){
        res.send({
            success: true,
            data: err.message
        })
    }
})
// SHOW: get
router.get('/:id', async (req,res)=>{
    try{
        const voyager = await Voyager.findById(req.params.id);
        // if there are no voyagers
        if(!voyager){
            throw new Error("No Item by that id here")
        }
        res.send({
            success: true,
            daya: voyager
        })
    } catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})


// DELETE: delete 
router.delete('/:id', async (req,res)=>{
    try{
        //we get the item by the id above and sent it to the data 
        const voyager = await Voyager.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            data: voyager
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

// EDIT: put
router.put('/:id', async (req,res)=>{
    try{
        // pass 3 parameters! 
        // to test on LOCAL HOST PUT THIS:
        //in json content > then save {"productName": "orange", "quantity": "10"} 
        // run PUT localhost:3000/items/623cfabdb2cb41ad48e24adf - you can change ID
        const voyager = await Voyager.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.send({
            success: true,
            data: voyager
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})


module.exports = router