const express = require('express');
const minionsRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, 
        addToDatabase, deleteFromDatabasebyId, 
        updateInstanceInDatabase } = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send(); 
    }
});

minionsRouter.get('/', (req, res, next) => {
   res.send(getAllFromDatabase('minions')); 
});

minionsRouter.post('/', (req, res, next) => {
   const newMinion = addToDatabase('minions', req.body);
   res.status(201).send(newMinion);  
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId;
    const deletedSuccessful = deleteFromDatabasebyId('minions', minionId);
    if(deletedSuccessful) 
        res.status(204);
    else
        res.status(404);
    res.send();
});
 
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionWork = getAllFromDatabase('work').filter(task=> task.minionId === req.minion.id);
    res.send(minionWork);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
   const newWork = addToDatabase('work', req.body)
    res.status(201).send(newWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.body.minionId === req.params.minionId) {
    const updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
    } else {
        res.status(400).send();
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const workId = req.params.workId;
    const deletedSuccessfully = deleteFromDatabasebyId('work', workId);
    if(deletedSuccessfully) {
        res.status(204); 
    } else {
        res.status(404);
    }
    res.send();
});

module.exports = minionsRouter;