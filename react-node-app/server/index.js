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
const calanderRoute = require('./routes/calanderRoute')
const pdfRoutes = require('./routes/pdfRoutes');
const servicesRoute = require('./routes/servicesRoute');
const transactionReoute = require('./routes/transactionRoute');
const reportsRoutes = require('./routes/reportsRoutes');
const archiveRoute = require('./routes/archiveRoute')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static('./public'));
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

app.use(express.static('/server/public'))
app.use(authRoutes);
app.use('/news', newsRouter);
app.use('/ads', advertisementsRoute);
app.use('/degree', degreeRoute);
app.use('/charge',walletChargeRoute)
app.use('/grievances', grievanceRoute);
app.use('/suggestion', suggestionsRoute);
app.use('/schedule', scheduleRoute)
app.use('/calander',calanderRoute)
app.use('/pdf', pdfRoutes);
app.use('/services', servicesRoute);
app.use('/transaction', transactionReoute);
app.use('/collection',reportsRoutes)
app.use('/archive', archiveRoute)
