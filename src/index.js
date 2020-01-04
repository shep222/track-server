require('./models/User')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://shep222:Amazing2020$$@cluster0-lymxe.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', ()=>{
    console.log('Connected to Mongo');
})

mongoose.connection.on('error', (err)=>{
    console.error('Error connecting to Mongo', err);
})

app.get('/', requireAuth, (req,res)=>{
    res.send(`Your email: ${req.user.email}`)
});

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})
