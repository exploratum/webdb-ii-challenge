const express = require('express');
const router = express.Router();

const zooModel = require('../data/zooModel')



router.get('/', async (req, res) => {
    try {
      const zoos = await zooModel.find();
      res.status(200).json(zoos);
    }
    catch {
      res.sendStatus(500);
    }
  })
  
  router.use("/:id", validateZooId);
  
  router.get('/:id', async (req, res) => {
    try {
      const zoo = await zooModel.findById(req.params.id);
      res.status(200).json(zoo);
    }
    catch {
      res.sendStatus(500);
    }
  })
  
  router.delete('/:id', async (req, res) => {
    try {
      await zooModel.remove(req.params.id)
      res.sendStatus(200);
    }
    catch {
      res.sendStatus(500);
    }
  })
  
  router.put('/:id', validateZoo, async (req, res) => {
    try {
      const count = await zooModel.update(req.params.id, req.body)
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
  
  
  router.post('/', validateZoo, async (req, res) => {
    try {
      const id = await zooModel.insert(req.body)
      console.log("id:", id);
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
  
  
  async function validateZooId (req, res, next) {
      try {
        const zoo = await zooModel.findById(req.params.id);
        if(zoo) {
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
    
    async function validateZoo (req, res, next) {
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