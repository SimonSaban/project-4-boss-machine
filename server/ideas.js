const express = require('express');
const ideasRouter = express.Router();

const { getAllFromDatabase, getFromDatabaseById, 
    addToDatabase, deleteFromDatabasebyId, 
    updateInstanceInDatabase } = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    const idea = getFromDatabaseById('ideas', ideaId);
    if(idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send(); 
      }
});

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
   res.status(201).send(newIdea);  
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedSuccessfully = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(deletedSuccessfully) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});

module.exports = ideasRouter;