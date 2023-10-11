//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.
const mongoose = require('mongoose')

//cupcake schema for database
const cupcakeSchema = mongoose.Schema(
    {
        id: {type: String, required:true},
        flavour: {type: String, required:true},
        supplier: {type: String, required:true}
    }
)

module.exports = mongoose.model('Cupcake', cupcakeSchema)