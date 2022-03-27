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
/*
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionWork = getAllFromDatabase('work').filter(id=> id===req.minion.id);
    res.send(minionWork);
});*/

module.exports = minionsRouter;