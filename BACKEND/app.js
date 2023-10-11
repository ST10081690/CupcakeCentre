//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

const express = require('express');
const app = express();
const urlprefix = '/api'
const mongoose = require('mongoose')
const Cupcake = require('./models/cupcake')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    server: {sslCA: cert}};
const connstring = 'mongodb+srv://st10081690:ebSdUtjyPMm9M5do@clusterapds.flxnnx5.mongodb.net/?retryWrites=true&w=majority';

const cupcakeRoutes = require('./routes/cupcake');
const userRoutes = require('./routes/user');

//connecting to database
mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected :-)')
})
.catch(()=>
{
    console.log('NOT CONNECTED')

},options);

app.use(express.json())

//catering for CORS
app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
});

app.get(urlprefix+'/', (req,res) => {
    
    res.send('Hello World')

})

app.use(urlprefix+ '/cupcakes', cupcakeRoutes)
app.use(urlprefix+ '/users', userRoutes)

module.exports = app;