//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.
const mongoose = require('mongoose')

//user schema for database
const userSchema = mongoose.Schema(
    {
        username: {type: String, required:true, unique: true},
        name: {type: String, required:true},
        password: {type: String, required:true}
    }

);

module.exports = mongoose.model('User', userSchema);
