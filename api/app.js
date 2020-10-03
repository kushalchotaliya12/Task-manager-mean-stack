const express = require('express');
const app = express();

const {
    mongoose
} = require('./db/mongoose');

const bodyparser = require('body-parser');

// Load into mongoose models
const {
    List,
    Task
} = require('./db/models');


// Load Middleware
app.use(bodyparser.json());

// ROUTE HANDLERS

// LIST ROUTES
/**
 * GET /lists
 * Pupose: Get all lists
 */
app.get('/lists', (req, res) => {
    // Return array of lists from DB
    List.find().then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    })
})

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post('/lists', (req, res) => {
    // Create new list and Return updated array(includes id)
    let title = req.body.title;
    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // The full list document is returned (incl. id)
        res.send(listDoc);
    })
})

/**
 * PATCH /lists/:id
 * Purpose: Update a specified list
 */
app.patch('/lists/:id', (req, res) => {
    // Update the list
    List.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
app.delete('/lists/:id', (req, res) => {
    // Delete a list
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
})

/**
 * GET /lists/:listId/tasks
 * PURPOSE: Get all tasks of specific list
 */

app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
})

/**
 * POST /lists/:listId/tasks
 * PURPOSE: Create a new Task in list
 */

app.post('/lists/:listId/tasks', (req, res) => {
    // Create new task in specific list
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

/**
 * PATCH /lists/:listId/tasks/:taskId
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    })
})

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findByIdAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
})

app.listen(3000, () => {
    console.log("Server is Listening");
})