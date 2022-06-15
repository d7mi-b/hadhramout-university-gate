const express = require('express');
const mongoose = require('mongoose');
const Advertisements = require('./Models/advertismentModel');
const authRoutes = require('./routes/authroutes')
const newsRouter = require('./routes/newsRouter');
const advertisementsRoute = require('./routes/advertisementRoutes');
const degreeRoute = require('./routes/degreeRoute');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));


//Connect to database

mongoose.connect('mongodb://0.0.0.0:27017/HUG', { useNewUrlParser : true , useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to database")
        app.listen(PORT)
    })
    .catch(err => {
        console.log(err)
    })

app.use(authRoutes);
app.use('/news', newsRouter);
app.use('/advertisements', advertisementsRoute);
app.use('/degree', degreeRoute);
