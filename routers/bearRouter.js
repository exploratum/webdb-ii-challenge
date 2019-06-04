const express = require('express');
const router = express.Router();

const bearModel = require('../data/bearModel');

router.get('/', async (req, res) => {
    try {
      const bears = await bearModel.find();
      res.status(200).json(bears);
    }
    catch {
      res.status(500).json({errorMesage: "Can not get bears from database"});
    }
  })
  
  router.use("/:id", validateBearId);
  
  router.get('/:id', async (req, res) => {
    try {
      const bear = await bearModel.findById(req.params.id);
      res.status(200).json(bear);
    }
    catch {
      res.sendStatus(500);
    }
  })
  
  router.delete('/:id', async (req, res) => {
    try {
      await bearModel.remove(req.params.id)
      res.sendStatus(200);
    }
    catch {
      res.sendStatus(500);
    }
  })
  
  router.put('/:id', validateBear, async (req, res) => {
    try {
      const count = await bearModel.update(req.params.id, req.body)
      if(count) {
        res.status(200).json({"message": `${count} record(s) updated`});
      }
      else {
        res.status(400).json({message:"Invalid data"});
      }
    }
    catch {
      res.sendStatus(500);
    }
  })
  
  
  router.post('/', validateBear, async (req, res) => {
    try {
      const id = await bearModel.insert(req.body)
      if(id) {
        res.status(201).json({id});
      }
      else {
        res.status(400).json({message:"Invalid data"});
      }
    }
    catch {
      res.sendStatus(500);
    }
  })
  
  
  async function validateBearId (req, res, next) {
      try {
        const bear = await bearModel.findById(req.params.id);
        if(bear) {
          next();
        } 
        else {
          res.sendStatus(404);
        }
      }
      catch {
        res.sendStatus(500);
      }
    }
    
    async function validateBear (req, res, next) {
      const name = req.body.name;
      console.log('name:', name)
    
      if(name) {
        next();
      }
      else {
        res.status(400).json({errorMessage: "name is required!"})
      }
    }

    module.exports = router;