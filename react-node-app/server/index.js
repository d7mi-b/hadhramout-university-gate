const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroutes')
const newsRouter = require('./routes/newsRouter');
const advertisementRoute = require('./routes/advertisementRoutes');
const degreeRoute = require('./routes/degreeRoute');
const grievanceRoute = require('./routes/grievanceRoute');

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
app.use('/advert', advertisementRoute);
app.use('/degree', degreeRoute);
app.use('/grievances', grievanceRoute);
