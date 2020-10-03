const express  = require('express');
const app = express();

const {mongoose} = require('./db/mongoose');

const bodyparser = require('body-parser');

// Load into mongoose models
const {List, Task} = require('./db/models');


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
        res.send("ERROR: ",e);
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

})

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
app.delete('/lists/:id', (req, res) =>{
    // Delete a list
})

app.listen(3000, () => {
    console.log("Server is Listening");
})