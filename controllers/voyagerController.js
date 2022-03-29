const express = require('express');
const Voyager = require('../models/voyager');
const router = express.Router();

// make routes
// INDEX: get 
router.get('/', async (req,res)=>{
    try{
        // assign to variable items
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
router.get('/', async (req,res)=>{
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
router.delete(':/id', async (req,res)=>{
    try{
        const voyager = await Voyager.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            data: voyager
        })
    }catch(err){
        res.send({
            success: false,
            data: err
        })
    }
})

// EDIT: put
router.put(':/id', async (req,res)=>{
    try{
        const voyager = await Voyager.findByIdAndUpdate( req.params.id, req.body, {new:true});
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