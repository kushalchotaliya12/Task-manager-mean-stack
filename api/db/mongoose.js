// This file will handle connection logic to MongoDB 

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log("Error");
    console.log(e);
});

// Prevent deprecation warnings
// mongoose.set('useCreatedIndex', true);
// mongoose.set('useFindAndModify', true);

module.exports = {
    mongoose
};