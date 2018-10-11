const mongoose = require('mongoose')
require('dotenv').config();
const mongoDBErrors = require('mongoose-mongodb-errors')

mongoose.Promise = global.Promise;
// console.log("******** ENV **",process.env.MONGO_URI)
mongoose.plugin(mongoDBErrors);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});