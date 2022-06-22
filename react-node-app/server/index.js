const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroutes')
const newsRouter = require('./routes/newsRouter');
const advertisementsRoute = require('./routes/advertisementRoutes');
const degreeRoute = require('./routes/degreeRoute');
const walletChargeRoute = require('./routes/walletChargeRoutes')
const grievanceRoute = require('./routes/grievanceRoute');
const suggestionsRoute = require('./routes/suggestionRoute');
const scheduleRoute = require('./routes/scheduleRoute')

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
app.use('/ads', advertisementsRoute);
app.use('/degree', degreeRoute);
app.use('/charge',walletChargeRoute)
app.use('/grievances', grievanceRoute);
app.use('/suggestion', suggestionsRoute);
app.use('/schedule', scheduleRoute)
