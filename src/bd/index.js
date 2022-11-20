const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose');

const basename = path.basename(__filename);
const db = {};

mongoose.connect(process.env.MONGO_URI/* , { useNewUrlParser: true } */ /* useUnifiedTopology: true } */)


fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.' !== 0)) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(mongoose);
        db[model.modelName] = model;
    });


module.exports = db;