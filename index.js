const express = require('express');
const helmet = require('helmet');
const zooModel = require('./data/zooModel')

const server = express();

server.use(express.json());
server.use(helmet());



// endpoints here
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await zooModel.find();
    res.status(200).json(zoos);
  }
  catch {
    res.sendStatus(500);
  }
})

server.use("/api/zoos/:id", validateZooId);

server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await zooModel.findById(req.params.id);
    res.status(200).json(zoo);
  }
  catch {
    res.sendStatus(500);
  }
})

server.delete('/api/zoos/:id', async (req, res) => {
  try {
    await zooModel.remove(req.params.id)
    res.sendStatus(200);
  }
  catch {
    res.sendStatus(500);
  }
})

server.put('/api/zoos/:id', validateZoo, async (req, res) => {
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


server.post('/api/zoos/', validateZoo, async (req, res) => {
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

// const [id] = await db('zoos').insert(zoo)


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


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