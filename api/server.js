const express = require('express');

const test = require('../helpers/testModel');

const server = express();

server.use(express.json()); 

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/api/test', async (req, res) => {
  const rows = await test.getAll();

  res.status(200).json(rows);
});

server.post('/api/test', (req,res) => {
    const body = req.body;
    if(body.name) {
      test.insert(body)
        .then(id => {
          res.status(201).json(id) 
        })
        .catch(err => {
          res.status(500).json({message: 'Failed to add name'})
        })
    } else {
      res.status(400).json({message: 'Missing name '})
    }
  })

  server.delete('/api/test/:id', async (req, res) => {
      const body = req.params.id
      try {
      const count = await test.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: `The name id# ${body} has been deleted` });
      } else {
        res.status(404).json({ message: 'The name could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });






module.exports = server;
