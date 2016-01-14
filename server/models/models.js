var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlogEntry = new Schema({
    id: '',
    date_created: '',
    date_modified: '',
    category: '',
    title: '',
    description: '',
    images: []
});

mongoose.model('BlogEntry', BlogEntry);